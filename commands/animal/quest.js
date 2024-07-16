const { UserContextMenuCommandInteraction } = require('discord.js');
const {getUser, gif, cooldown, SimpleEmbed, fourButton, labelButton, ButtonStyle, getCollectionButton, customEmbed, sym} = require('../../functioon/function');
const moment = require('moment-timezone');

const cooldowns = new Map();
let CDT = 15_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'quest',
    async execute(client, message, args) {
        try{
            const user = message.author;

            const userData = await getUser(user.id);

            if(userData.premium.premium_bool){
                if(!prem.includes(user.id)){
                    prem.push(user.id);
                }
            }

            if(cooldown(user.id, getId, cdId, CDT, message, cooldowns, prem)){
                return;
            };

            const now = moment.tz('Asia/Phnom_Penh');
            const tomorrow = moment.tz('Asia/Phnom_Penh').add(1, 'day').startOf('day').hours(0);
            const timeUntilReset = tomorrow - now;
            const hours = Math.floor(timeUntilReset / (1000 * 60 * 60));
            const minutes = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeUntilReset % (1000 * 60)) / 1000);

            if(userData.quest.quest_nextday < tomorrow || !userData.quest.quest_nextday){
                userData.quest.quest_nextday = tomorrow;
                userData.quest.hunt_point = 0;
                userData.quest.battle_point = 0;
                userData.quest.work_point = 0;
                userData.quest.fight_point = 0;

                userData.quest.hunt_claimed = false;
                userData.quest.battle_claimed = false;
                userData.quest.work_claimed = false;
                userData.quest.fight_claimed = false;
                try{ await userData.save(); }catch(error){}
            }

            const claim_one = labelButton('claim_one', 'Claim', ButtonStyle.Success);
            const claim_two = labelButton('claim_two', 'Claim', ButtonStyle.Success);
            const claim_three = labelButton('claim_three', 'Claim', ButtonStyle.Success);
            const claim_four = labelButton('claim_four', 'Claim', ButtonStyle.Success);

            claim_one.setDisabled(true); if(userData.quest.hunt_claimed){ claim_one.setLabel('Claimed'); }
            claim_two.setDisabled(true); if(userData.quest.battle_claimed){ claim_two.setLabel('Claimed'); }
            claim_three.setDisabled(true); if(userData.quest.work_claimed){ claim_three.setLabel('Claimed'); }
            claim_four.setDisabled(true); if(userData.quest.fight_claimed){ claim_four.setLabel('Claimed'); }

            if(userData.quest.hunt_point >= 50 && !userData.quest.hunt_claimed){
                claim_one.setDisabled(false);
            }
            if(userData.quest.battle_point >= 50 && !userData.quest.battle_claimed){
                claim_two.setDisabled(false);
            }
            if(userData.quest.work_point >= 5 && !userData.quest.work_claimed){
                claim_three.setDisabled(false);
            }
            if(userData.quest.fight_point >= 25 && !userData.quest.fight_claimed){
                claim_four.setDisabled(false);
            }

            const allButton = fourButton(claim_one, claim_two, claim_three, claim_four);

            const embed = customEmbed()
                .setAuthor({ name: `${user.displayName} Quest!`,iconURL: user.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`Your quest today <@${user.id}>\n1. **Hunting animal totally 50 times**\n  ❖ Reward: 500${gif.shard_gif}\n  ❖ Progress: [${userData.quest.hunt_point}/50]\n2. **Battle animal or ft your friends 50 times**\n  ❖ Reward: ${gif['050']}${gif['050']}${gif['050']}${gif['050']}${gif['050']}\n  ❖ Progress: [${userData.quest.battle_point}/50]\n3. **Working 5 time**\n  ❖ Reward: ${gif['050']}${gif['050']}${gif['050']}${gif['050']}${gif['050']}\n  ❖ Progess: [${userData.quest.work_point}/5]\n4. **Fighting dragon or ft your fri 25 times**\n  ❖ Reward: ${gif['100']}${gif['100']}${gif['100']}${gif['100']}${gif['100']}\n  ❖ Progess: [${userData.quest.fight_point}/25]\n\n${sym}Quest will reset in ${hours}h, ${minutes}m, ${seconds}s${sym}\n\n`)
                .setTimestamp()

            const mgs = await message.channel.send({ embeds: [embed], components: [allButton] });

            const collector = getCollectionButton(mgs, 300_000);

            collector.on('end', (collected, reason) =>{
                if(reason === 'time'){
                    mgs.edit({ components: [] });
                    collector.stop();
                    return;
                }
            });

            collector.on('collect', async (interaction) =>{
                try{
                    if(interaction.member.user.id !== user.id){
                        await interaction.reply({ content: 'This button is not for you!', ephemeral: true });
                        return;
                    }
                    
                    if(interaction.customId == 'claim_one'){
                        userData.shard += 500;
                        userData.quest.hunt_claimed = true;
                        claim_one.setLabel('Claimed');
                        claim_one.setDisabled(true);

                        await interaction.update({ components: [allButton] });
                    }
                    if(interaction.customId == 'claim_two'){
                        userData.gem['050'] += 5;
                        userData.quest.battle_claimed = true;
                        claim_two.setLabel('Claimed');
                        claim_two.setDisabled(true);
            
                        await interaction.update({ components: [allButton] });
                    }
                    if(interaction.customId == 'claim_three'){
                        userData.gem['050'] += 5;
                        userData.quest.work_claimed = true;
                        claim_three.setLabel('Claimed');
                        claim_three.setDisabled(true);
            
                        await interaction.update({ components: [allButton] });
                    }
                    if(interaction.customId == 'claim_four'){
                        userData.gem['100'] += 5;
                        userData.quest.fight_claimed = true;
                        claim_four.setLabel('Claimed');
                        claim_four.setDisabled(true);

                        await interaction.update({ components: [allButton] });
                    }

                    try{ await userData.save(); }catch(error){}
                }catch(error){}
            });

        }catch(error){
            console.log(`quest error ${error}`);
        }
    },
};