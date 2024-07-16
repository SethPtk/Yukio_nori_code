const { Component } = require('discord.js');
const {mileToHour, mileToMin, mileToSec, getRandomInt, SimpleEmbed, gif, sym, labelButton, ButtonStyle, oneButton, getCollectionButton} = require('../../functioon/function');
const giveaways = new Map();;
const moment = require('moment-timezone');
const asiaTimezone = 'Asia/Phnom_Penh';

module.exports = {
    name: 'gstart',
    async execute(client, message, args) {
        try{
            let time = parseInt(args[0]);
            const winners = parseInt(args[1])
            const prize = args.slice(2).join(' ');

            if (!time || isNaN(time) || time <= 0 || !prize) {
                return message.reply('please provide a valid duration and prize for the giveaway.');
            }

            const giveaway = {
                prize: prize,
                participants: []
            };

            let endTime = 0;
            let type = args[0];

            if(type == `${time}m`){
                time *= 60_000;
                endTime = time;

            }else if(type == `${time}d`){
                time *= 86_400_000;
                endTime = time;
            
            }else if(type == `${time}h`){
                time *= 3_600_000;
                endTime = time;

            }else{
                time *= 1_000;
                endTime = time;
            }

            let hours = 0;
            let mins = 0;
            let secs = 0;

            hours = mileToHour(time);
            mins = mileToMin(time);
            secs = mileToSec(time);

            giveaways.set(message.channel.id, giveaway);

            const currentTime = new Date();
            const cooldownEnd = new Date(currentTime.getTime() + endTime);
            let joiner = 0;

            const join = labelButton('join', `🎉 ${joiner}`, ButtonStyle.Primary);
            const joinButton = oneButton(join);

            const mgs = await message.channel.send({ embeds: [SimpleEmbed(`Please Join 🎉 before the giveaway end \n**Users who join** will win\n\n${prize}\n\nEnd <t:${Math.floor(cooldownEnd.getTime() / 1000)}:R>\n**Only ${winners} users will win** Please enjoy`).setAuthor({ name: `🎉 New Giveaway has Come!` }).setTimestamp()], components: [joinButton] });

            mgs.react('🩷');
            mgs.react('💝');
            mgs.react('💖');
            mgs.react('💗');
            mgs.react('❤️');
            mgs.react('❤️‍🔥');
            mgs.react('💚');
            mgs.react('💙');
            mgs.react('🩵');

            mgs.react('🌝');
            mgs.react('🌑');
            mgs.react('🌒');
            mgs.react('🌓');
            mgs.react('🌔');
            mgs.react('🌕');
            mgs.react('🌖');
            mgs.react('🌗');
            mgs.react('🌘');

            mgs.react('💥');
            mgs.react('💦');

            const collector = getCollectionButton(mgs, endTime);

            collector.on('end', (collected, reason) =>{
                if(reason === 'time'){
                    collector.stop();
                }
            });

            collector.on('collect', async (interaction) =>{
                if (interaction.member.user.bot) return;

                if(interaction.customId === 'join'){
                    if (!giveaway.participants.includes(interaction.member.user.id)) {
                        joiner += 1;
                        giveaway.participants.push(interaction.member.user.id);
                        join.setLabel(`🎉 ${joiner}`);
                        await interaction.update({ components: [joinButton] });
                        await interaction.followUp({ content: '🎉 You have joined!', ephemeral: true });
                    }else{
                        await interaction.reply({ content: '🎉 You already joined', ephemeral: true });
                    }
                }
            });
        
            if(hours == 0){
                hours = 1;
            }
            if(mins == 0){
                mins = 60;
            }
            if(secs == 0){
                secs = 60;
            }

            setTimeout(async () =>{

                let allWinnser = '';
                var arrayWinners = [];

                for(let i = 1; i <= winners; i ++){
                    let selected = giveaway.participants[getRandomInt(0, giveaway.participants.length)]
                    if(arrayWinners.length < giveaway.participants.length){
                        while(arrayWinners.includes(selected)){
                            selected = giveaway.participants[getRandomInt(0, giveaway.participants.length)]
                        }
                        arrayWinners.push(selected);
                        allWinnser += `<@${selected}> `;
                    }
                }

                try{ mgs.edit({ embeds: [SimpleEmbed(`I **hope** the other users who were not chosen **luck** the next time\n\n${allWinnser}\n\n**Wins ${prize}**\n\n**${winners} users has been selected** Please enjoy the **Reward**`).setAuthor({ name: `🎉 Giveaway Ended!` }).setColor('Aqua').setTimestamp()], components: [] }); }catch(error){}
                
                collector.stop();

            }, endTime);
        }catch(error){
            console.log(`giveaway error ${error}`); 
        }
    },
};