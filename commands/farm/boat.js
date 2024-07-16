const { sleep, gif, getUser, getRandomInt, sym, cooldown, getCollectionButton, SimpleEmbed, customEmbed, ButtonStyle, twoButton, threeButton, labelButton, toSuperscript} = require('../../functioon/function');
const moment = require('moment-timezone');

const cooldowns = new Map();
let CDT = 30_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'boat',
    async execute(client, message, args) {
        try{
            if(args[0]){ return; }

            const user = message.author;

            const userData = await getUser(user.id);

            if(!userData.premium.premium_bool){ return; }

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

            if(userData.farm.boat_date >= tomorrow){
                const embed_passed = customEmbed()
                    .setAuthor({ name: `${user.displayName}'s Boat`, iconURL: user.displayAvatarURL() })
                    .setColor('Aqua')
                    .setDescription(`🏠: Boat 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n\n🚢...⛵....🌊...⛵...🌊....⛵...🌊\n\n✉️..see you next time dear!..\n\n${sym}The boat will back in ${hours}h, ${minutes}m, ${seconds}s${sym}\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)
                    .setTimestamp()
                message.channel.send({ embeds: [embed_passed] });
                return;
            }
            if(userData.farm.boat_nextday < tomorrow || !userData.farm.boat_nextday){
                userData.farm.boat_nextday = tomorrow;
                userData.farm.limit_coin = 0;
                const boat_box = getRandomInt(2, 5);
                if(boat_box == 2){
                    userData.farm.boat_box_need = boat_box;
                    const ran_box_one = getRandomInt(1, 11);
                    const ran_box_two = getRandomInt(1, 11);
                    userData.farm.boat_box_one_amount = ran_box_one;
                    userData.farm.boat_box_two_amount = ran_box_two;

                }else if(boat_box == 3){
                    userData.farm.boat_box_need = boat_box;
                    const ran_box_one = getRandomInt(1, 11);
                    const ran_box_two = getRandomInt(1, 11);
                    const ran_box_three = getRandomInt(1, 11);
                    userData.farm.boat_box_one_amount = ran_box_one;
                    userData.farm.boat_box_two_amount = ran_box_two;
                    userData.farm.boat_box_three_amount = ran_box_three;

                }else if(boat_box == 4){
                    userData.farm.boat_box_need = boat_box;
                    const ran_box_one = getRandomInt(1, 11);
                    const ran_box_two = getRandomInt(1, 11);
                    const ran_box_three = getRandomInt(1, 11);
                    const ran_box_four = getRandomInt(1, 11);
                    userData.farm.boat_box_one_amount = ran_box_one;
                    userData.farm.boat_box_two_amount = ran_box_two;
                    userData.farm.boat_box_three_amount = ran_box_three;
                    userData.farm.boat_box_four_amount = ran_box_four;
                }
                try{ await userData.save(); }catch(error){}
            }

            let show_box_one = '';
            let show_box_two = '';
            let show_box_three = '';
            let show_box_four = '';

            let coin_increase = 0;
            let cash_increase = 0;

            if(userData.farm.boat_box_need == 2){
                show_box_one = `📦${toSuperscript(1, 1)}[${userData.farm.box_one}/${userData.farm.boat_box_one_amount}] `;
                show_box_two = `📦${toSuperscript(2, 2)}[${userData.farm.box_two}/${userData.farm.boat_box_two_amount}]`;
                
            }else if(userData.farm.boat_box_need == 3){
                show_box_one = `📦${toSuperscript(1, 1)}[${userData.farm.box_one}/${userData.farm.boat_box_one_amount}] `;
                show_box_two = `📦${toSuperscript(2, 2)}[${userData.farm.box_two}/${userData.farm.boat_box_two_amount}] `;
                show_box_three = `📦${toSuperscript(3, 3)}[${userData.farm.box_three}/${userData.farm.boat_box_three_amount}]`;

            }else if(userData.farm.boat_box_need == 4){
                show_box_one = `📦${toSuperscript(1, 1)}[${userData.farm.box_one}/${userData.farm.boat_box_one_amount}] `;
                show_box_two = `📦${toSuperscript(2, 2)}[${userData.farm.box_two}/${userData.farm.boat_box_two_amount}] `;
                show_box_three = `📦${toSuperscript(3, 3)}[${userData.farm.box_three}/${userData.farm.boat_box_three_amount}] `;
                show_box_four = `📦${toSuperscript(4, 4)}[${userData.farm.box_four}/${userData.farm.boat_box_four_amount}]`;
            }

            const pass_button = labelButton('pass_button', `Pass`, ButtonStyle.Success);
            const exchange_button = labelButton('exchange_button', `Exchange 📃`, ButtonStyle.Primary);
            const refresh_button = labelButton('refresh_button', `Refresh ♻️`, ButtonStyle.Danger);
            refresh_button.setDisabled(true);
            const allButton = threeButton(pass_button, exchange_button, refresh_button);

            const exchange = labelButton('exchange', `Ex-Change 🪙`, ButtonStyle.Success); if(userData.farm.limit_coin >= 3000 || userData.farm.coin < 150){ exchange.setDisabled(true); }
            const back_button = labelButton('back_button', `Back`, ButtonStyle.Danger);
            const ex_button = twoButton(exchange, back_button);

            const embed = customEmbed()
                .setAuthor({ name: `${user.displayName}'s Boat`, iconURL: user.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`🏠: Boat 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n\n🚢...⛵....🌊...⛵...🌊....⛵...🌊\n\n👲..ohh all I need is:\n\n${show_box_one}${show_box_two}${show_box_three}${show_box_four}\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)
                .setTimestamp()
            const mgs = await message.channel.send({ embeds: [embed], components: [allButton] });

            const exchange_embed = customEmbed()
                .setAuthor({ name: `${user.displayName}'s Boat`, iconURL: user.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`🏠: Exchange 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n${gif.cash}: **${userData.balance.toLocaleString()}**\n\n${sym}☁️       🌤️                       ☁️${sym}\n\nValue of exchnage: 150🪙 = 250,000${gif.cash}\n\n${sym}Limit Exchange [${userData.farm.limit_coin}/3000] will reset in ${hours}h, ${minutes}, ${seconds}${sym}\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)
                .setTimestamp()

            const collector = getCollectionButton(mgs, 60_000);

            collector.on('end', (collected, reason) =>{
                if(reason === 'time'){
                    mgs.edit({ embeds: [embed], components: [] });
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
                    const userData = await getUser(user.id);
    
                    if(interaction.customId == 'exchange_button'){
                            await interaction.update({ embeds: [exchange_embed], components: [ex_button] });
                        return;
                    }

                    if(interaction.customId == 'exchange'){
                        if(userData.farm.coin < 150){
                            await interaction.reply({ content: 'coin not enough!', ephemeral: true });
                            return;
                        }
                        userData.farm.limit_coin += 150;
                        if(userData.farm.limit_coin >= 3000){
                            exchange.setDisabled(true);
                        }
                        userData.farm.coin -= 150;
                        userData.balance += 250000;
                        coin_increase += 150;
                        cash_increase += 250000;
                        await interaction.update({ embeds: [exchange_embed.setDescription(`🏠: Exchange 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n${gif.cash}: **${userData.balance.toLocaleString()}**\n\n${sym}☁️       🌤️                       ☁️${sym}\n\nValue of exchnage: 150🪙 = 250,000${gif.cash}\n-${coin_increase}🪙 +${cash_increase.toLocaleString()}${gif.cash}\n\n${sym}Limit Exchange [${userData.farm.limit_coin}/3000] will reset in ${hours}h, ${minutes}, ${seconds}${sym}\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [ex_button] });
                        try{ await userData.save(); }catch(error){}
                        return;
                    }

                    if(interaction.customId == 'back_button'){
                        await interaction.update({ embeds: [embed.setDescription(`🏠: Boat 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n\n🚢...⛵....🌊...⛵...🌊....⛵...🌊\n\n👲..ohh all I need is:\n\n${show_box_one}${show_box_two}${show_box_three}${show_box_four}\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [allButton] }); return;
                    }

                    if(interaction.customId == 'pass_button'){
                        let total = 0;

                        if(userData.farm.boat_box_need == 2){
                            if(userData.farm.box_one < userData.farm.boat_box_one_amount || userData.farm.box_two < userData.farm.boat_box_two_amount){
                                await interaction.reply({ content: 'not enough box!', ephemeral: true });
                                return; 
                            }
                            userData.farm.box_one -= userData.farm.boat_box_one_amount;
                            userData.farm.box_two -= userData.farm.boat_box_two_amount;
                            total = (150*userData.farm.boat_box_one_amount)+(200*userData.farm.boat_box_two_amount);

                        }else if(userData.farm.boat_box_need == 3){
                            if(userData.farm.box_one < userData.farm.boat_box_one_amount || userData.farm.box_two < userData.farm.boat_box_two_amount || userData.farm.box_three < userData.farm.boat_box_three_amount){
                                await interaction.reply({ content: 'not enough box!', ephemeral: true });
                                return; 
                            }
                            userData.farm.box_one -= userData.farm.boat_box_one_amount;
                            userData.farm.box_two -= userData.farm.boat_box_two_amount;
                            userData.farm.box_three -= userData.farm.boat_box_three_amount;
                            total = (150*userData.farm.boat_box_one_amount)+(200*userData.farm.boat_box_two_amount)+(150*userData.farm.boat_box_three_amount);

                        }else if(userData.farm.boat_box_need == 4){
                            if(userData.farm.box_one < userData.farm.boat_box_one_amount || userData.farm.box_two < userData.farm.boat_box_two_amount || userData.farm.box_three < userData.farm.boat_box_three_amount || userData.farm.box_four < userData.farm.boat_box_four_amount){
                                await interaction.reply({ content: 'not enough box!', ephemeral: true });
                                return; 
                            }
                            userData.farm.box_one -= userData.farm.boat_box_one_amount;
                            userData.farm.box_two -= userData.farm.boat_box_two_amount;
                            userData.farm.box_three -= userData.farm.boat_box_three_amount;
                            userData.farm.box_four -= userData.farm.boat_box_four_amount;
                            total = (150*userData.farm.boat_box_one_amount)+(200*userData.farm.boat_box_two_amount)+(150*userData.farm.boat_box_three_amount)+(70*userData.farm.boat_box_four_amount);
                        }

                        userData.farm.coin += total;
                        userData.farm.boat_date = tomorrow;

                        pass_button.setDisabled(true);
                        await interaction.update({ embeds: [embed.setDescription(`🏠: Boat 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n\n🚢...⛵....🌊...⛵...🌊....⛵...🌊\n\n👲..this is your coin: +🪙${total.toLocaleString()} gotta work!\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [allButton] });
                        try{ await userData.save(); }catch(error){}
                    } 
                }catch(error){}
            });

        }catch(error){
            console.log(`boat error ${error}`);
        }
    },
};
