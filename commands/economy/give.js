const {getUser, SimpleEmbed, gif, labelButton, twoButton, ButtonStyle, customEmbed, getCollectionButton, sym3, sym, cooldown} = require('../../functioon/function');
const moment = require('moment-timezone');

const cooldowns = new Map();
let CDT = 20_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'give',
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
            const tomorrow = moment.tz('Asia/Phnom_Penh').add(1, 'day').startOf('day').hours(6);

            if(userData.next_day < tomorrow || !userData.next_day){
                userData.next_day = tomorrow;
                userData.balance_limit = 0;
                try{ await userData.save(); }catch(error){}
            }

            let balanceLimit = 1000000 * userData.levelSystem.level;

            if(userData.premium.premium_bool){
                balanceLimit = parseInt(balanceLimit * 2);
            }

            let leftLimit = balanceLimit - userData.balance_limit;

            if(leftLimit <= 0){
                const timeUntilReset = tomorrow - now;
                const hours = Math.floor(timeUntilReset / (1000 * 60 * 60));
                const minutes = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeUntilReset % (1000 * 60)) / 1000);

                message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}> Limit transfer today try again in ${hours}h ${minutes}m ${seconds}s**`)] });
                return; 
            }

            leftLimit = balanceLimit - userData.balance_limit;

            let amount_cash = args[0];
            let amount = parseInt(args[0]);
            if(isNaN(amount)){
                amount_cash = args[1];
                amount = parseInt(args[1]);
            }

            if(amount_cash == `${amount}k` || amount_cash == `${amount}K`){
                amount *= 1000;
            }else if(amount_cash == `${amount}m` || amount_cash == `${amount}M`){
                amount *= 1000000;
            }

            if(isNaN(amount) || amount <= 0) {
                message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}> how much you want to transfer?**`)] });
                return;
            }

            if (amount > userData.balance) {
                message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}> your Yukio not enough**`)] });
                return;
            }

            if (amount > leftLimit) {
                amount = leftLimit;
            }

            const mention = message.mentions.users.first();
            if(mention){
                const targetData = await getUser(mention.id);

                if(!targetData){
                    message.reply({ embeds: [SimpleEmbed(`<@${mention.id}> didn't play Yukio`)] });
                    return;
                }

                if (mention.id === user.id) {
                    message.reply({ embeds: [SimpleEmbed('oy klun eng ot kert te')] });
                    return;
                }

                const embed = customEmbed()
                    .setAuthor({ name: `${user.username}, you are about to give cash to ${mention.username}`, iconURL: user.displayAvatarURL() })
                    .setColor('Aqua')
                    .setDescription(`To confirm this transaction, click ✅ Confirm.\nTo cancel this transaction, click ❎ Cancel.\n\n⚠️ It is against our rules to trade yukio for anything of monetary value. This includes real money, crypto, nitro, or anything similar. You will be banned for doing so.\nLimit Cash now: ${leftLimit.toLocaleString()}\n\n<@${user.id}> **Will give** <@${mention.id}>:\n${sym3}${amount.toLocaleString()} Yukio${sym3}`)
                    .setTimestamp();

                const confirmButton = labelButton('confirm_button', '✅ Confirm', ButtonStyle.Success);
                const cancelButton = labelButton('cancel_button', '❎ Cancel', ButtonStyle.Danger);
                const allButtons = twoButton(confirmButton, cancelButton);

                const messageEmbed = await message.channel.send({ embeds: [embed], components: [allButtons] });

                const collector = getCollectionButton(messageEmbed, CDT);

                collector.on('end', (collected, reason) => {
                    if (reason === 'time') {
                        confirmButton.setDisabled(true);
                        cancelButton.setDisabled(true);
                        messageEmbed.edit({ embeds: [embed.setColor('#3D3D3D')], components: [allButtons] });
                        return;
                    }
                });

                collector.on('collect', async (interaction) => {
                    if(interaction.member.user.id !== user.id){
                        await interaction.reply({ content: 'This button is not for you!', ephemeral: true });
                        return;
                    }

                    if(interaction.customId === 'confirm_button'){
                        try{
                            const userData = await getUser(user.id);
                            const targetData = await getUser(mention.id);
                            userData.balance_limit += amount;
                            userData.balance -= amount;
                            targetData.balance += amount;

                            if(userData.balance_limit >= leftLimit){
                                userData.next_day = now.add(1, 'day');
                            }
                            
                            await Promise.all([
                                targetData.save(),
                                userData.save()
                            ]);
                        }catch(error){}

                        confirmButton.setDisabled(true);
                        cancelButton.setDisabled(true);

                        interaction.update({ embeds: [embed.setDescription(`This is **Transition** from ${user.username} to ${mention.username} .\n\n✅ **Done**, It is against our rules to trade yukio for anything of monetary value. This includes real money, crypto, nitro, or anything similar. You will be banned for doing so.\nLimit Cash now: ${leftLimit.toLocaleString()}\n\n<@${user.id}> **Gave** <@${mention.id}>:\n` + '```' + `fix\n${amount.toLocaleString()} Yukio\n` + '```').setColor("Green")], components: [] });
                        collector.stop();
                    }

                    if (interaction.customId === 'cancel_button') {

                        confirmButton.setDisabled(true);
                        cancelButton.setDisabled(true);

                        interaction.update({ embeds: [embed.setDescription(`This is **Transition** from ${user.username} to ${mention.username} .\n\n:x: **Cancel**, It is against our rules to trade yukio for anything of monetary value. This includes real money, crypto, nitro, or anything similar. You will be banned for doing so.\nLimit Cash now: ${leftLimit.toLocaleString()}\n\n<@${user.id}> **Stop** <@${mention.id}>:\n${sym3}${amount.toLocaleString()} Yukio${sym3}`).setColor("Red")], components: [] });
                        collector.stop();
                    }
                });
            }else{
                message.reply({ embeds: [SimpleEmbed('Mention someone')] });
                return;
            }
        }catch(error){
            console.log(`give error ${error}`);
        }
    },
};