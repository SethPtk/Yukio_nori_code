const {getUser, SimpleEmbed, getAnimalIdByName, gif, customEmbed, labelButton, twoButton, ButtonStyle, getCollectionButton} = require('../../functioon/function');

const moment = require('moment-timezone');
const asiaTimezone = 'Asia/Phnom_Penh';

module.exports = {
    name: 'tr',
    async execute(client, message, args) {
        try{
            const user = message.author;

            if(user.id != '1155362022146457671'){
                return;
            }

            const mentions = message.mentions.users.first();
            const ticket = args[0]

            if(!ticket){
                return message.reply('Enter ticket name!');

            }else if(ticket == 'premium'){
                const userData = await getUser(mentions.id);

                if(userData.premium.premium_bool){
                    return message.channel.send({ embeds: [SimpleEmbed(`**${mentions.displayName}** already activated **PREMIUM YUKIO** ${gif.premium_yukio}`)] });
                }
                const currentTime = moment.tz(asiaTimezone);
                const cooldownEnd = currentTime.clone().add(31, 'days');

                userData.premium.premium_bool = true;
                userData.premium.premium_endDate = cooldownEnd;
                message.channel.send({ embeds: [SimpleEmbed(`**${mentions.displayName}** got **PREMIUM YUKIO** ${gif.premium_yukio}`)] });
                try{ await userData.save(); }catch(error){}
                return;

            }else if(!['jjk', 'patreon', 'op', 'opm', 'ds', 'cg', 'nt', 'nm', 'ms', 'cm', 'kn8'].includes(ticket)){
                return message.reply('Wrong ticket name!');

            }
            if(!mentions){
                return;
            }
            let id_ticket = '';
            if(ticket == 'patreon'){
                id_ticket = '014';
            }else if(ticket == 'jjk'){
                id_ticket = 'jjk';
            }else if(ticket == 'op'){
                id_ticket = 'op';
            }else if(ticket == 'opm'){
                id_ticket = 'opm';
            }else if(ticket == 'ds'){
                id_ticket = 'ds';
            }else if(ticket == 'cg'){
                id_ticket = 'cg';
            }else if(ticket == 'nt'){
                id_ticket = 'nt';
            }else if(ticket == 'nm'){
                id_ticket = 'nm';
            }else if(ticket == 'ms'){
                id_ticket = 'ms';
            }else if(ticket == 'cm'){
                id_ticket = 'cm';
            }else if(ticket == 'kn8'){
                id_ticket = 'kn8';
            }

            let target = await getUser(mentions.id);
            if(target){
                const embed = customEmbed()
                    .setColor('Aqua')
                    .setDescription(`Are you sure to give a ${gif[`${id_ticket}`]} **Ticket** to <@${mentions.id}>`)
                const agree_button = labelButton('agree_button', 'Agree', ButtonStyle.Success);
                const decline_button = labelButton('decline_button', 'Decline', ButtonStyle.Danger);
                const allButton = twoButton(agree_button, decline_button);

                const mgs = await message.channel.send({ embeds: [embed], components: [allButton] });

                const collector = getCollectionButton(mgs, 10_000);

                collector.on('end', (collected, reason) =>{
                    if(reason == 'time'){
                        collector.stop()                            
                        agree_button.setDisabled(true);
                        decline_button.setDisabled(true);
                        mgs.edit({ embeds: [embed.setColor('#3D3D3D')], components: [allButton] });
                        return;
                    }else{
                        collector.stop()
                        agree_button.setDisabled(true);
                        decline_button.setDisabled(true);
                        mgs.edit({ components: [] });
                        return;
                    }
                });

                collector.on('collect', async (interaction) =>{
                    if(interaction.member.user.id != user.id){
                        await interaction.reply({ content: 'this button is not for you!', ephemeral: true });
                        return;
                    }
    
                    if(interaction.customId == 'agree_button'){
                        
                        target.gem[`${id_ticket}`] += 1;
                        await target.save();
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> Sent ${gif[`${id_ticket}`]} to <@${mentions.id}>`)]});
                        collector.stop();
                        return;
                    }
    
                    if(interaction.customId == 'decline_button'){
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> has cancel **Ticket**`)], components: [] });
                        collector.stop();
                        return;
                    }
                });
            }else{
                message.reply('User did not play Yukio!');
            }

        }catch(error){
            console.log(`ticket : ${error}`);
        }
    },
};