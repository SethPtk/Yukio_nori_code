try{
    const { PermissionsBitField } = require('discord.js');
    const mongoose = require('mongoose');
    const { userSchema } = require('../../users/user');
    const User = mongoose.model('User', userSchema);
    require('dotenv').config();
    const { getUser, ButtonStyle, oneButton, labelButton, getCollectionButton, sym } = require('../../functioon/function');
    const config = require('../../config');
    const fs = require('fs');
    let banlist = [];
    let serverlist = [];

    const AUTOMATION_THRESHOLD = 5;
    const TIME_WINDOW = 10000;
    let messageCache = {};

    const userFirstCommandTimes = new Map();
    const TIMES = 1 * 60 * 60 * 1000;

    async function detectMessage(client){

        const { getEconomy, getGambling, getUtility, getSocial, getGiveaway, getAdmin, getWork, getMine, getGame, getRank, getDragon, getAnimal, getFarm, getSlashCommands } = require('../../msc/Handler/commandHandler');
        const { leveling } = require('../../events/leveling');
        const { prem } = require('../../events/premium');

        client.on('messageCreate', async (message) =>{
            
            banlist = JSON.parse(fs.readFileSync('./banlist.json', 'utf8'));
            serverlist = JSON.parse(fs.readFileSync('./banServerlist.json', 'utf8'));

            if(banlist.includes(message.author.id) || serverlist.includes(message.guildId) || message.content == 'ok'){ return; }

            const guildPrefix = getGuildPrefix(message.guild.id);
            const messageContent = message.content;
            const lowerCaseMessageContent = messageContent.toLowerCase();

            if(!(lowerCaseMessageContent.startsWith(guildPrefix.toLowerCase()) || lowerCaseMessageContent.startsWith(config.prefix.toLowerCase())) || message.author.bot){ return; }

            const botMember = message.guild.members.me;

            if(!botMember.permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)){
                return;
            }else if(!botMember.permissionsIn(message.channel).has(PermissionsBitField.Flags.ManageMessages)){
                return;
            }else if(!botMember.permissionsIn(message.channel).has(PermissionsBitField.Flags.EmbedLinks)){
                return;
            }else if(!botMember.permissionsIn(message.channel).has(PermissionsBitField.Flags.AttachFiles)){
                return;
            }else if(!botMember.permissionsIn(message.channel).has(PermissionsBitField.Flags.AddReactions)){
                return;
            }else if(!botMember.permissionsIn(message.channel).has(PermissionsBitField.Flags.ReadMessageHistory)){
                return;
            }

            const userId = message.author.id;
            const content = message.content;

            if (!messageCache[userId]) {
                messageCache[userId] = [];
            }

            messageCache[userId].push({ content, timestamp: Date.now() });
            messageCache[userId] = messageCache[userId].filter(msg => msg.timestamp > Date.now() - TIME_WINDOW);
            const similarMessages = messageCache[userId].filter(msg => msg.content === content).length;

            const currentTime = new Date().getTime();
            if(!userFirstCommandTimes.has(userId)){
                userFirstCommandTimes.set(userId, currentTime);
            }      
            if(userFirstCommandTimes.has(userId)){
                const collector = message.channel.createMessageCollector({
                    filter: (msg) => msg.author.id === message.author.id,
                    time: 300_000,
                    max: 1,
                });
            
                collector.on('end', (collected, reason) => {
                    if (reason === 'time') {
                        userFirstCommandTimes.delete(userId);
                    }
                });
            }
            if(currentTime - userFirstCommandTimes.get(userId) >= TIMES || similarMessages >= AUTOMATION_THRESHOLD){
                userFirstCommandTimes.delete(userId);

                const banlist = loadBanlist();
                if(!banlist.includes(userId)){
                    banlist.push(userId);
                    saveBanlist(banlist);
                }
                const verify = labelButton('verify', 'Verify', ButtonStyle.Primary);
                const allButton = oneButton(verify);
                const mgs = await message.reply({ content: '`To verify you are human DM to Admin because are sus of using auto farm or selfbot!`🚫', components: [allButton] });

                const collector = getCollectionButton(mgs, 60_000);

                collector.on('collect', async (interaction) =>{
                    if(interaction.member.user.id != userId){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }
        
                    if(interaction.customId == 'verify'){
                        verify.setDisabled(true);

                        if(banlist.includes(userId)){
                            const updatedBanlist = banlist.filter(id => id !== userId);
                            saveBanlist(updatedBanlist);
                        }

                        await interaction.update({ content: `${sym}Verified you are human🌻${sym}`, components: [allButton] });
                        try{ 
                            const hostUser = client.users.cache.get(userId);
                            if(hostUser){await hostUser.send('`Verified you are human!`🌻');} 
                        }catch(error){}
                        collector.stop();
                        return;
                    }
                });

                collector.on('end', async (collected, reason) => {
                    if(reason == 'time'){
                        try{
                            const hostUser = client.users.cache.get(userId);
                            if(hostUser){await hostUser.send('`To verify you are human DM to Admin because are sus of using auto farm or selfbot!`🚫');} 
                        }catch(error){}
                        mgs.edit({ components: [] });
                        collector.stop();
                        return;
                    }
                });

                return;
            }

            const actualPrefix = lowerCaseMessageContent.startsWith(guildPrefix.toLowerCase()) ? guildPrefix : config.prefix;

            const args = messageContent.slice(actualPrefix.length).trim().split(/ +/);
            let commandName = args.shift().toLowerCase();

            let userData = await getUser(message.author.id);
            if (!userData) {
                userData = new User({
                    userId: message.author.id,
                    balance: 50000
                });
                await userData.save();
            }
            if (!userData.username) { userData.username = `${message.author.username}`; };

            leveling(message);
            prem(message);

            if(commandName == 'leaveserver' || commandName == 'nextday' || commandName == 'clear' || commandName == 'get' || commandName == 'wish' || commandName == 'del' || commandName == 'grant' || commandName == 'unequipe' || commandName == 'dron' || commandName == 'tr' || commandName == 'blacklist' || commandName == 'whitelist' || commandName == 'wen' || commandName == 'find' || commandName == 'streak'){
                const admin = getAdmin.get(commandName) || getAdmin.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!admin) return;

                if(message.author.id == '1069079113261908008' && commandName == 'nextday'){
                    admin.execute(client, message, args);
                    return;
                }

                if(message.author.id == process.env.devId || message.author.id == process.env.devId2 || message.author.id == process.env.devId3){
                    admin.execute(client, message, args);
                    return;
                }

            }else if(commandName == 'bt' || commandName == 'boat' || commandName == 'ha' || commandName == 'hang' || commandName == 'rongjak' || commandName == 'r' || commandName == 'p' || commandName == 'psa' || commandName == 'teas' || commandName == 't'){
                if(commandName == 't'){ commandName = 'teas'; }
                else if(commandName == 'p'){ commandName = 'psa'; }
                else if(commandName == 'r'){ commandName = 'rongjak'; }
                else if(commandName == 'ha'){ commandName = 'hang'; }
                else if(commandName == 'bt'){ commandName = 'boat'; }
                const farm = getFarm.get(commandName) || getFarm.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!farm) return;

                farm.execute(client, message, args);
                return;

            }else if(commandName == 'prem' || commandName == 'premium' || commandName == 'myid' || commandName == 'ping' || commandName == 'help' || commandName == 'state' || commandName == 'test' || commandName == 'prefix' || commandName == 'supporter' || commandName == 'spp' || commandName == 'policy'){
                if(commandName == 'spp'){ commandName = 'supporter'; }
                if(commandName == 'prem'){ commandName = 'premium'; }
                const utility = getUtility.get(commandName) || getUtility.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!utility) return;

                utility.execute(client, message, args);
                return;

            }else if(commandName == 'kb' || commandName == 'killingbot' || commandName == 'q' || commandName == 'quest' || commandName == 'br' || commandName == 'rank' || commandName == 'hunt' || commandName == 'h' || commandName == 'zoo' || commandName == 'z' || commandName == 'sell' || commandName == 'inventory' || commandName == 'inv' || commandName == 'use' || commandName == 'lb' || commandName == 'lootbox' || commandName == 'tm' || commandName == 'team' || commandName == 'battle' || commandName == 'b' || commandName == 'weapon' || commandName == 'w' || commandName == 'crate' || commandName == 'wc' || commandName == 'dex' || commandName == 'd' || commandName == 'dismantle' || commandName == 'dmt'){
                if(commandName == 'hunt'){ commandName = 'h'; }
                else if(commandName == 'zoo'){ commandName = 'z'; }
                else if(commandName == 'inventory'){ commandName = 'inv'; }
                else if(commandName == 'lb'){ commandName = 'lootbox'; }
                else if(commandName == 'tm'){ commandName = 'team'; }
                else if(commandName == 'battle'){ commandName = 'b'; }
                else if(commandName == 'weapon'){ commandName = 'w'; }
                else if(commandName == 'd'){ commandName = 'dex'; }
                else if(commandName == 'wc'){ commandName = 'crate'; }
                else if(commandName == 'dmt'){ commandName = 'dismantle'; }
                else if(commandName == 'q'){ commandName = 'quest'; }
                else if(commandName == 'kb'){ commandName = 'killingbot'; }

                const animal = getAnimal.get(commandName) || getAnimal.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!animal) return;

                animal.execute(client, message, args);
                return;

            }else if(commandName == 'egg' || commandName == 'fight'|| commandName == 'f' || commandName == 'hold' || commandName == 'item' || commandName == 'upgrade' || commandName == 'ug'){
                if(commandName == 'f'){ commandName = 'fight'; }
                else if(commandName == 'ug'){ commandName = 'upgrade'; }

                const dragon = getDragon.get(commandName) || getDragon.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!dragon) return;

                dragon.execute(client, message, args);
                return;

            }else if(commandName == 'top'){
                const rank = getRank.get(commandName) || getRank.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!rank) return;

                rank.execute(client, message, args);
                return;

            }else if(commandName == 'hm' || commandName == 'ttt' || commandName == 'c4' || commandName == 'rps' || commandName == 'trivia' || commandName == 'connect4' || commandName == 'rockpaperscissors' || commandName == 'wordle' || commandName == 'tictactoe' || commandName == 'minesweeper' || commandName == 'hangman' || commandName == 'snake' || commandName == 'sa' || commandName == 'survival' || commandName == 'race' || commandName == 'bankrob' || commandName == 'br' || commandName == 'guess'){
                if(commandName == 'br'){ commandName = 'bankrob'; }
                else if(commandName == 'sa'){ commandName = 'survival'; }
                else if(commandName == 'hm'){ commandName = 'hangman'; }
                else if(commandName == 'ttt'){ commandName = 'tictactoe'; }
                else if(commandName == 'c4'){ commandName = 'connect4'; }
                else if(commandName == 'rps'){ commandName = 'rockpaperscissors'; }

                const game = getGame.get(commandName) || getGame.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!game) return;

                game.execute(client, message, args);
                return;

            }else if(commandName == 'str' || commandName == 'storage' || commandName == 'buy' || commandName == 'box' || commandName == 'mine' || commandName == 'm' || commandName == 'tool' || commandName == 'break' || commandName == 'trade' || commandName == 'transfer' || commandName == 'tf'){
                if(commandName == 'm'){
                    commandName = 'mine';
                }else if(commandName == 'transfer'){
                    commandName = 'tf';
                }else if(commandName == 'storage'){
                    commandName = 'str';
                }

                const mine = getMine.get(commandName) || getMine.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!mine) return;

                mine.execute(client, message, args);
                return;
            }else if(commandName == 'gstart'){
                const giveaway = getGiveaway.get(commandName) || getGiveaway.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(giveaway || message.author.id == process.env.devId || message.author.id == '1069079113261908008' || message.author.id == '940949823505432616'){
                    giveaway.execute(client, message, args);
                }
                return;
                
            }else if(commandName == 'pf' || commandName == 'profile' || commandName == 'xp' || commandName == 'level' || commandName == 'lvl' || commandName == 'avatar' || commandName == 'background' || commandName == 'bg' || commandName == 'profile' || commandName == 'pf'){
                if(commandName == 'level'){ commandName = 'xp'; }
                else if(commandName == 'lvl'){ commandName = 'xp'; }
                else if(commandName == 'pf'){ commandName = 'profile'; }
                else if(commandName == 'bg'){ commandName = 'background'; }

                const social = getSocial.get(commandName) || getSocial.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!social) return;

                social.execute(client, message, args);
                return;
            }else if(commandName == 'gold' || commandName == 'cash' || commandName == 'bal' || commandName == 'give' || commandName == 'pay' || commandName == 'daily' || commandName == 'shop'){
                if(commandName == 'bal'){                           
                    commandName = 'cash';
                }else if(commandName == 'pay'){
                    commandName = 'give';
                }

                const economy = getEconomy.get(commandName) || getEconomy.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!economy) return;

                economy.execute(client, message, args);
                return;
            }else if(commandName == 'cup' || commandName == 'lottery' || commandName == 'cf' || commandName == 'coin flip' || commandName == 's' || commandName == 'slot' || commandName == 'bj' || commandName == 'blackjack' || commandName == 'kk' || commandName == 'kla' || commandName == 'pav'){
                if(commandName == 'coin flip'){
                    commandName = 'cf';
                }else if(commandName == 'slot'){
                    commandName = 's';
                }else if(commandName == 'blackjack'){
                    commandName = 'bj';
                }else if(commandName == 'kla'){
                    commandName = 'kk';
                }
                const gambling = getGambling.get(commandName) || getGambling.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!gambling) return;

                gambling.execute(client, message, args);
                return;
            }else if(commandName == 'apply' || commandName == 'resign' || commandName == 'work' || commandName == 'job' || commandName == 'gowork'){
                const work = getWork.get(commandName) || getWork.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(!work) return;

                work.execute(client, message, args);
                return;
            }
        });

        client.on('interactionCreate', async (interaction) => {
            if(interaction.isCommand()){
                const { commandName } = interaction;
                const command = getSlashCommands.get(commandName);
            
                if (!command) return;
            
                try {
                    await command.execute(interaction, client);
                } catch (error) {
                    console.error(`slach commands error : ${error}`);
                }
            }
        });
    }

    function getGuildPrefix(guildId) {
        return config.prefixes[guildId] || config.prefix;
    }
    function loadBanlist() {
        try {
            const data = fs.readFileSync('./banlist.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading banlist:', error);
            return [];
        }
    }
    
    function saveBanlist(banlist) {
        try {
            fs.writeFile('./banlist.json', JSON.stringify(banlist), (err) => {
                if (err) {
                    console.error('Error saving banlist:', err);
                }
            });
        } catch (error) {
            console.error('Error saving banlist:', error);
        }
    }

    setInterval(() => {
        const currentTime = new Date();
        userFirstCommandTimes.forEach((firstCommandTime, userId) => {
            if(currentTime - firstCommandTime >= 10000){
                
            }
        });
    }, 10000);

    module.exports = { detectMessage };

}catch (error){
    console.log(`error detectMessage : ${error}`);
}