const { sleep, gif, getUser, getRandomInt, sym, cooldown, getCollectionButton, SimpleEmbed, customEmbed, ButtonStyle, threeButton, labelButton, toSuperscript, InteractionCollector} = require('../../functioon/function');
const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const moment = require('moment-timezone');

const cooldowns = new Map();
let CDT = 60_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'psa',
    async execute(client, message, args) {
        try{
            if(args[0]){ return; }

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

            let tree1 = userData.farm.tree1;
            let tree2 = userData.farm.tree2;

            const now = moment.tz('Asia/Phnom_Penh');
            const tomorrow = moment.tz('Asia/Phnom_Penh').add(1, 'day').startOf('day').hours(0);

            if(userData.farm.psa_date < tomorrow || !userData.farm.psa_date){
                userData.farm.psa_date = tomorrow;
                userData.farm.max_seed = 0;
                userData.farm.max_rice = 0;
                userData.farm.max_milk = 0;
                try{ await userData.save(); }catch(error){} 
            }

            let seed_amount = 0;
            let rice_amount = 0;
            let milk_amount = 0;

            let seed = '';
            let rice = '';
            let milk = '';

            let amount = 1;

            let setAmount = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('set_amount_psa')
                .setPlaceholder('1')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: `1`,
                        description: `Set amount to 1.`,
                        value: `one`
                    },
                    {
                        label: `2`,
                        description: `Set amount to 2.`,
                        value: `two`
                    },
                    {
                        label: `5`,
                        description: `Set amount to 5.`,
                        value: `five`
                    },
                    {
                        label: `10`,
                        description: `Set amount to 10.`,
                        value: `ten`
                    },
                ])
            );

            const interactionHandler = async (interaction) =>{
                try{
                    if(!interaction.isStringSelectMenu()){
                        return; 
                    }
                    if(interaction.member.user.id != user.id){
                        return;
                    }
                    if(interaction.customId != 'set_amount_psa'){
                        return;
                    }
                    if(interaction.deferred){
                        return;
                    }
                    
                    const selectedOption = interaction.values[0];
                
                    switch(selectedOption){
                        case 'one':
                            amount = 1;
                            break;
                        case 'two':
                            amount = 2;
                            break;
                        case 'five':
                            amount = 5;
                            break;
                        case 'ten':
                            amount = 10;
                            break;
                        default:
                            await interaction.reply({ content: 'Invalid option selected!', ephemeral: true });
                            return;
                    }
                    await interaction.deferUpdate();
                }catch(error){}
                return;
            };
            client.on('interactionCreate', interactionHandler);
            const interc = new InteractionCollector(client, { 
                time: 60_000
            });
            interc.on('end', () => {
                client.removeListener('interactionCreate', interactionHandler);
            });

            const buy_seed_button = labelButton('buy_seed_button', `Buy 🪹`, ButtonStyle.Success);
            const buy_rice_button = labelButton('buy_rice_button', `Buy 🌾`, ButtonStyle.Success);
            const buy_milk_button = labelButton('buy_milk_button', `Buy 🥛`, ButtonStyle.Success);
            const allButton = threeButton(buy_seed_button, buy_rice_button, buy_milk_button);

            if(userData.farm.max_seed >= 100){
                buy_seed_button.setDisabled(true);
            }
            if(userData.farm.max_rice >= 300){
                buy_rice_button.setDisabled(true);
            }
            if(userData.farm.max_milk >= 300){
                buy_milk_button.setDisabled(true);
            }

            const embed = customEmbed()
                .setAuthor({ name: `${user.displayName}'s market`, iconURL: user.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`🏠: Psa 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n👨‍🌾\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}\n[]===[]===[]===[]...........[]===[]===[]===[]\n[]🪹....🌾....🥛[]...........[]🐄....🐤....🐖[]\n[]===[]===[]===[]...........[]===[]===[]===[]\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}\nDaily limit [🪹(${userData.farm.max_seed}/100), 🌾(${userData.farm.max_rice}/300), 🥛(${userData.farm.max_milk}/300)]\n\n|**5🪙 = 1🪹, 2🪙 = 1🌾, 3🪙 = 1🥛**|\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)
                .setTimestamp()
            const mgs = await message.channel.send({ embeds: [embed], components: [setAmount, allButton] });

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

                    if(interaction.customId === 'buy_seed_button'){
                        if(userData.farm.coin < 5*amount){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.max_seed + amount >= 100){
                            buy_seed_button.setDisabled(true);
                        }
                        if(userData.farm.max_seed + amount > 100){
                            await interaction.reply({ content: 'daily limit!', ephemeral: true });
                            return;
                        }

                        seed_amount += amount;
                        userData.farm.max_seed += amount;
    
                        if(seed_amount > 0){
                            seed = `🪹${toSuperscript(seed_amount, seed_amount)}`;
                        }
                        if(rice_amount > 0){
                            rice = `🌾${toSuperscript(rice_amount, rice_amount)}`;
                        }
                        if(milk_amount > 0){
                            milk = `🥛${toSuperscript(milk_amount, milk_amount)}`;
                        }
    
                        userData.farm.coin -= 5*amount;
                        userData.farm.seed += amount;
                    }
    
                    if(interaction.customId === 'buy_rice_button'){
                        if(userData.farm.coin < 2*amount){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.max_rice + amount >= 300){
                            buy_rice_button.setDisabled(true);
                        }
                        if(userData.farm.max_rice + amount > 300){
                            await interaction.reply({ content: 'daily limit!', ephemeral: true });
                            return;
                        }

                        rice_amount += amount;
                        userData.farm.max_rice += amount;
    
                        if(seed_amount > 0){
                            seed = `🪹${toSuperscript(seed_amount, seed_amount)}`;
                        }
                        if(rice_amount > 0){
                            rice = `🌾${toSuperscript(rice_amount, rice_amount)}`;
                        }
                        if(milk_amount > 0){
                            milk = `🥛${toSuperscript(milk_amount, milk_amount)}`;
                        }
    
                        userData.farm.coin -= 2*amount;
                        userData.farm.rice += amount;
                    }
    
                    if(interaction.customId === 'buy_milk_button'){
                        if(userData.farm.coin < 3*amount){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.max_milk + amount >= 300){
                            buy_milk_button.setDisabled(true);
                        }
                        if(userData.farm.max_milk + amount > 300){
                            await interaction.reply({ content: 'daily limit!', ephemeral: true });
                            return;
                        }

                        milk_amount += amount;
                        userData.farm.max_milk += amount;
    
                        if(seed_amount > 0){
                            seed = `🪹${toSuperscript(seed_amount, seed_amount)}`;
                        }
                        if(rice_amount > 0){
                            rice = `🌾${toSuperscript(rice_amount, rice_amount)}`;
                        }
                        if(milk_amount > 0){
                            milk = `🥛${toSuperscript(milk_amount, milk_amount)}`;
                        }
    
                        userData.farm.coin -= 3*amount;
                        userData.farm.milk += amount;
                    }
    
                    setAmount = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('set_amount_psa')
                        .setPlaceholder(`${amount}`)
                        .setMinValues(1)
                        .setMaxValues(1)
                        .addOptions([
                            {
                                label: `1`,
                                description: `Set amount to 1.`,
                                value: `one`
                            },
                            {
                                label: `2`,
                                description: `Set amount to 2.`,
                                value: `two`
                            },
                            {
                                label: `5`,
                                description: `Set amount to 5.`,
                                value: `five`
                            },
                            {
                                label: `10`,
                                description: `Set amount to 10.`,
                                value: `ten`
                            },
                        ])
                    );
    
                    await interaction.update({ embeds: [embed.setDescription(`🏠: Psa 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n👨‍🌾,${seed}${rice}${milk}\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}\n[]===[]===[]===[]...........[]===[]===[]===[]\n[]🪹....🌾....🥛[]...........[]🐄....🐤....🐖[]\n[]===[]===[]===[]...........[]===[]===[]===[]\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}\nDaily limit [🪹(${userData.farm.max_seed}/100), 🌾(${userData.farm.max_rice}/300), 🥛(${userData.farm.max_milk}/300)]\n\n|**5🪙 = 1🪹, 2🪙 = 1🌾, 3🪙 = 1🥛**|\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [setAmount, allButton] });
                    try{ await userData.save(); }catch(error){} 
                }catch(error){}
            });

        }catch(error){
            console.log(`psa error ${error}`);
        }
    },
};
