const { sleep, gif, getUser, getRandomInt, sym, cooldown, getCollectionButton, SimpleEmbed, customEmbed, ButtonStyle, fiveButton, fourButton, labelButton, toSuperscript, InteractionCollector} = require('../../functioon/function');
const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

const cooldowns = new Map();
let CDT = 60_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'rongjak',
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
            
            let amount = 1;

            let setAmount = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('set_amount_rongjak')
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
                        label: `3`,
                        description: `Set amount to 3.`,
                        value: `three`
                    },
                    {
                        label: `5`,
                        description: `Set amount to 5.`,
                        value: `five`
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
                    if(interaction.customId != 'set_amount_rongjak'){
                        return;
                    }
                    if(interaction.deferred){
                        return;
                    }
                    
                    const selectedOption = interaction.values[0];
                
                    switch(selectedOption) {
                        case 'one':
                            amount = 1;
                            break;
                        case 'two':
                            amount = 2;
                            break;
                        case 'three':
                            amount = 3;
                            break;
                        case 'five':
                            amount = 5;
                            break;
                        default:
                            await interaction.reply({ content: 'Invalid option selected!', ephemeral: true });
                            return;
                    }
                    await interaction.deferUpdate();
                }catch(error){}
            };
            client.on('interactionCreate', interactionHandler);
            const interc = new InteractionCollector(client, { 
                time: 300_000
            });
            interc.on('end', () => {
                client.removeListener('interactionCreate', interactionHandler);
            });

            const add_ah_lerk = labelButton('add_ah_lerk', 'Add 🍉', ButtonStyle.Success);
            const add_ju = labelButton('add_ju', 'Add 🍇', ButtonStyle.Success);
            const add_khatna = labelButton('add_khatna', 'Add 🥦', ButtonStyle.Success);
            const add_rice = labelButton('add_rice', 'Add 🌾', ButtonStyle.Success);
            const add_milk = labelButton('add_milk', 'Add 🥛', ButtonStyle.Success);
            const allButton_add = fiveButton(add_ah_lerk, add_ju, add_khatna, add_rice, add_milk);

            const mix_buttton = labelButton('mix_buttton', 'Mixing', ButtonStyle.Primary);
            const sell_button = labelButton('sell_button', 'Sell 🪙', ButtonStyle.Primary);
            const renew_button = labelButton('renew_button', 'Renew', ButtonStyle.Danger);
            const again_button = labelButton('again_button', 'Again', ButtonStyle.Primary);
            const allButton = fourButton(mix_buttton, sell_button, again_button, renew_button);

            let result = '❔';

            let ah_lerk_amount = 0;
            let ju_amount = 0;
            let khatna_amount = 0;
            let rice_amount = 0;
            let milk_amount = 0;

            let pizza = '';
            let hamburger = '';
            let fries = '';
            let hotdog = '';
            let pancakes = '';
            let bread = '';
            let french_bread = '';
            let flatbread = '';

            let showCoin = '';

            if(userData.farm.pizza > 0){
                pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
            }
            if(userData.farm.hamburger > 0){
                hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
            }
            if(userData.farm.fries > 0){
                fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
            }
            if(userData.farm.hotdog > 0){
                hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
            }
            if(userData.farm.pancakes > 0){
                pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
            }
            if(userData.farm.bread > 0){
                bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
            }
            if(userData.farm.french_bread > 0){
                french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
            }
            if(userData.farm.flatbread > 0){
                flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
            }

            let for_sell = '';
            let qty_ran = getRandomInt(1, 6);
            let sell_ran = getRandomInt(1, 9);

            let for_sell2 = '';
            let qty_ran2 = getRandomInt(1, 6);
            let sell_ran2 = getRandomInt(1, 9);

            let for_sell3 = '';
            let qty_ran3 = getRandomInt(1, 6);
            let sell_ran3 = getRandomInt(1, 9);
    
            if(userData.farm.for_sell == 0 && userData.farm.qty_sell == 0){
                userData.farm.for_sell = sell_ran;
                userData.farm.qty_sell = qty_ran;
                try{ await userData.save(); }catch(error){}
            }else{
                qty_ran = userData.farm.qty_sell;
                sell_ran = userData.farm.for_sell;
            }
            if(userData.farm.for_sell2 == 0 && userData.farm.qty_sell2 == 0){
                userData.farm.for_sell2 = sell_ran2;
                userData.farm.qty_sell2 = qty_ran2;
                try{ await userData.save(); }catch(error){}
            }else{
                qty_ran2 = userData.farm.qty_sell2;
                sell_ran2 = userData.farm.for_sell2;
            }
            if(userData.farm.for_sell3 == 0 && userData.farm.qty_sell3 == 0){
                userData.farm.for_sell3 = sell_ran3;
                userData.farm.qty_sell3 = qty_ran3;
                try{ await userData.save(); }catch(error){}
            }else{
                qty_ran3 = userData.farm.qty_sell3;
                sell_ran3 = userData.farm.for_sell3;
            }

            if(sell_ran == 1){
                for_sell = '🍕';
            }else if(sell_ran == 2){
                for_sell = '🍔';
            }else if(sell_ran == 3){
                for_sell = '🍟';
            }else if(sell_ran == 4){
                for_sell = '🌭';
            }else if(sell_ran == 5){
                for_sell = '🥞';
            }else if(sell_ran == 6){
                for_sell = '🍞';
            }else if(sell_ran == 7){
                for_sell = '🥖';
            }else if(sell_ran == 8){
                for_sell = '🫓';
            }

            if(sell_ran2 == 1){
                for_sell2 = '🍕';
            }else if(sell_ran2 == 2){
                for_sell2 = '🍔';
            }else if(sell_ran2 == 3){
                for_sell2 = '🍟';
            }else if(sell_ran2 == 4){
                for_sell2 = '🌭';
            }else if(sell_ran2 == 5){
                for_sell2 = '🥞';
            }else if(sell_ran2 == 6){
                for_sell2 = '🍞';
            }else if(sell_ran2 == 7){
                for_sell2 = '🥖';
            }else if(sell_ran2 == 8){
                for_sell2 = '🫓';
            }

            if(sell_ran3 == 1){
                for_sell3 = '🍕';
            }else if(sell_ran3 == 2){
                for_sell3 = '🍔';
            }else if(sell_ran3 == 3){
                for_sell3 = '🍟';
            }else if(sell_ran3 == 4){
                for_sell3 = '🌭';
            }else if(sell_ran3 == 5){
                for_sell3 = '🥞';
            }else if(sell_ran3 == 6){
                for_sell3 = '🍞';
            }else if(sell_ran3 == 7){
                for_sell3 = '🥖';
            }else if(sell_ran3 == 8){
                for_sell3 = '🫓';
            }

            const embed = customEmbed()
                .setAuthor({ name: `${user.displayName}'s factory`, iconURL: user.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`🏠: factory 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n👨‍🌾 🍉${toSuperscript(userData.farm.ah_lerk, userData.farm.ah_lerk)}🍇${toSuperscript(userData.farm.ju, userData.farm.ju)}🥦${toSuperscript(userData.farm.khatna, userData.farm.khatna)}🌾${toSuperscript(userData.farm.rice, userData.farm.rice)}🥛${toSuperscript(userData.farm.milk, userData.farm.milk)}${pizza}${hamburger}${fries}${hotdog}${pancakes}${bread}${french_bread}${flatbread}\n\n[0]🍉,...[0]🍇,...[0]🥦,...[0]🌾,...[0]🥛\n\n>>>>>>>>>>>>>>[{❔}]<<<<<<<<<<<<<<\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n\n**Customer need**\n[${for_sell}${toSuperscript(qty_ran, qty_ran)}], [${for_sell2}${toSuperscript(qty_ran2, qty_ran2)}], [${for_sell3}${toSuperscript(qty_ran3, qty_ran3)}]`)
                .setTimestamp()
            const mgs = await message.channel.send({ embeds: [embed], components: [setAmount, allButton_add, allButton] });

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
    
                    const userData = await getUser(user.id);
                    showCoin = '';
    
                    if(interaction.customId === 'add_ah_lerk'){
                        if(userData.farm.ah_lerk < amount || ah_lerk_amount+amount > userData.farm.ah_lerk){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        ah_lerk_amount += amount;
                    }
                    if(interaction.customId === 'add_ju'){
                        if(userData.farm.ju < amount || ju_amount+amount > userData.farm.ju){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        ju_amount += amount;
                    }
                    if(interaction.customId === 'add_khatna'){
                        if(userData.farm.khatna < amount || khatna_amount+amount > userData.farm.khatna){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        khatna_amount += amount;
                    }
                    if(interaction.customId === 'add_rice'){
                        if(userData.farm.rice < amount || rice_amount+amount > userData.farm.rice){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        rice_amount += amount;
                    }
                    if(interaction.customId === 'add_milk'){
                        if(userData.farm.milk < amount || milk_amount+amount > userData.farm.milk){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        milk_amount += amount;
                    }
    
    
    
                    if(interaction.customId === 'mix_buttton'){
                        if(ah_lerk_amount <= 0 && ju_amount <= 0 && khatna_amount <= 0 && rice_amount <= 0 && milk_amount <= 0){
                            await interaction.reply({ content: 'add resoucre first!', ephemeral: true });
                            return;
                        }
    
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        add_ah_lerk.setDisabled(true);
                        add_ju.setDisabled(true);
                        add_khatna.setDisabled(true);
                        add_rice.setDisabled(true);
                        add_milk.setDisabled(true);
    
                        mix_buttton.setDisabled(true);
                        sell_button.setDisabled(true);
    
                        if(ah_lerk_amount == 2 && ju_amount == 2 && khatna_amount == 2 && rice_amount == 0 && milk_amount == 0){
                            if(userData.farm.ah_lerk < 2 || userData.farm.ju < 2 || userData.farm.khatna < 2){
                                await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                                return;
                            }
                            result = '🍕';
                            userData.farm.ah_lerk -= 2;
                            userData.farm.ju -= 2;
                            userData.farm.khatna -= 2;
                            userData.farm.pizza += 1;
                        }else if(ah_lerk_amount == 0 && ju_amount == 0 && khatna_amount == 3 && rice_amount == 2 && milk_amount == 2){
                            if(userData.farm.khatna < 3 || userData.farm.rice < 2 || userData.farm.milk < 3){
                                await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                                return;
                            }
                            result = '🍔';
                            userData.farm.khatna -= 3;
                            userData.farm.rice -= 2;
                            userData.farm.milk -= 2;
                            userData.farm.hamburger += 1;
                        }else if(rice_amount == 3 && milk_amount == 1 && ah_lerk_amount == 0 && ju_amount == 2 && khatna_amount == 0){
                            if(userData.farm.rice < 3 || userData.farm.milk < 1 || userData.farm.ju < 2){
                                await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                                return;
                            }
                            result = '🍟';
                            userData.farm.rice -= 3;
                            userData.farm.milk -= 1;
                            userData.farm.ju -= 2;
                            userData.farm.fries += 1;
                        }else if(rice_amount == 3 && ah_lerk_amount == 3 && ju_amount == 0 && khatna_amount == 0){
                            if(userData.farm.rice < 3 || userData.farm.ah_lerk < 3){
                                await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                                return;
                            }
                            result = '🌭';
                            userData.farm.rice -= 3;
                            userData.farm.ah_lerk -= 3;
                            userData.farm.hotdog += 1;
                        }else if(ah_lerk_amount == 5 && ju_amount == 5 && khatna_amount == 5 && rice_amount == 5 && milk_amount == 5){
                            if(userData.farm.ah_lerk < 5 || userData.farm.ju < 5 || userData.farm.khatna < 5 || userData.farm.rice < 5 || userData.farm.milk < 5){
                                await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                                return;
                            }
                            result = '🥞';
                            userData.farm.ah_lerk -= 5;
                            userData.farm.ju -= 5;
                            userData.farm.khatna -= 5;
                            userData.farm.rice -= 5;
                            userData.farm.milk -= 5;
                            userData.farm.pancakes += 1;
                        }else if(ah_lerk_amount == 5 && ju_amount == 0 && khatna_amount == 0 && rice_amount == 0 && milk_amount == 0){
                            if(userData.farm.ah_lerk < 5){
                                await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                                return;
                            }
                            result = '🍞';
                            userData.farm.ah_lerk -= 5;
                            userData.farm.bread += 1;
                        }else if(ah_lerk_amount == 0 && ju_amount == 5 && khatna_amount == 0 && rice_amount == 0 && milk_amount == 0){
                            if(userData.farm.ju < 5){
                                await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                                return;
                            }
                            result = '🥖';
                            userData.farm.ju -= 5;
                            userData.farm.french_bread += 1;
                        }else if(ah_lerk_amount == 0 && ju_amount == 0 && khatna_amount == 5 && rice_amount == 0 && milk_amount == 0){
                            if(userData.farm.khatna < 5){
                                await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                                return;
                            }
                            result = '🫓';
                            userData.farm.khatna -= 5;
                            userData.farm.flatbread += 1;
                        }else{ result = '💩'; }
                    }
                    if(interaction.customId === 'sell_button'){
                        let total = 0;
                        
                        if(sell_ran == 1){
                            if(userData.farm.pizza >= qty_ran){
                                total += qty_ran*6;
                                userData.farm.pizza -= qty_ran;
                                new_ran();
                            }
                        }else if(sell_ran == 2){
                            if(userData.farm.hamburger >= qty_ran){
                                total += qty_ran*16;
                                userData.farm.hamburger -= qty_ran;
                                new_ran();
                            }
                        }else if(sell_ran == 3){
                            if(userData.farm.fries >= qty_ran){
                                total += qty_ran*15;
                                userData.farm.fries -= qty_ran;
                                new_ran();
                            }
                        }else if(sell_ran == 4){
                            if(userData.farm.hotdog >= qty_ran){
                                total += qty_ran*12;
                                userData.farm.hotdog -= qty_ran;
                                new_ran();
                            }
                        }else if(sell_ran == 5){
                            if(userData.farm.pancakes >= qty_ran){
                                total += qty_ran*91;
                                userData.farm.pancakes -= qty_ran;
                                new_ran();
                            }
                        }else if(sell_ran == 6){
                            if(userData.farm.bread >= qty_ran){
                                total += qty_ran*6;
                                userData.farm.bread -= qty_ran;
                                new_ran();
                            }
                        }else if(sell_ran == 7){
                            if(userData.farm.french_bread >= qty_ran){
                                total += qty_ran*6;
                                userData.farm.french_bread -= qty_ran;
                                new_ran();
                            }
                        }else if(sell_ran == 8){
                            if(userData.farm.flatbread >= qty_ran){
                                total += qty_ran*6;
                                userData.farm.flatbread -= qty_ran;
                                new_ran();
                            }
                        }
    
                        if(sell_ran2 == 1){
                            if(userData.farm.pizza >= qty_ran2){
                                total += qty_ran2*6;
                                userData.farm.pizza -= qty_ran2;
                                new_ran2();
                            }
                        }else if(sell_ran2 == 2){
                            if(userData.farm.hamburger >= qty_ran2){
                                total += qty_ran2*16;
                                userData.farm.hamburger -= qty_ran2;
                                new_ran2();
                            }
                        }else if(sell_ran2 == 3){
                            if(userData.farm.fries >= qty_ran2){
                                total += qty_ran2*15;
                                userData.farm.fries -= qty_ran2;
                                new_ran2();
                            }
                        }else if(sell_ran2 == 4){
                            if(userData.farm.hotdog >= qty_ran2){
                                total += qty_ran2*12;
                                userData.farm.hotdog -= qty_ran2;
                                new_ran2();
                            }
                        }else if(sell_ran2 == 5){
                            if(userData.farm.pancakes >= qty_ran2){
                                total += qty_ran2*91;
                                userData.farm.pancakes -= qty_ran2;
                                new_ran2();
                            }
                        }else if(sell_ran2 == 6){
                            if(userData.farm.bread >= qty_ran2){
                                total += qty_ran2*6;
                                userData.farm.bread -= qty_ran2;
                                new_ran2();
                            }
                        }else if(sell_ran2 == 7){
                            if(userData.farm.french_bread >= qty_ran2){
                                total += qty_ran2*6;
                                userData.farm.french_bread -= qty_ran2;
                                new_ran2();
                            }
                        }else if(sell_ran2 == 8){
                            if(userData.farm.flatbread >= qty_ran2){
                                total += qty_ran2*6;
                                userData.farm.flatbread -= qty_ran2;
                                new_ran2();
                            }
                        }
    
                        if(sell_ran3 == 1){
                            if(userData.farm.pizza >= qty_ran3){
                                total += qty_ran3*6;
                                userData.farm.pizza -= qty_ran3;
                                new_ran3();
                            }
                        }else if(sell_ran3 == 2){
                            if(userData.farm.hamburger >= qty_ran3){
                                total += qty_ran3*16;
                                userData.farm.hamburger -= qty_ran3;
                                new_ran3();
                            }
                        }else if(sell_ran3 == 3){
                            if(userData.farm.fries >= qty_ran3){
                                total += qty_ran3*15;
                                userData.farm.fries -= qty_ran3;
                                new_ran3();
                            }
                        }else if(sell_ran3 == 4){
                            if(userData.farm.hotdog >= qty_ran3){
                                total += qty_ran3*12;
                                userData.farm.hotdog -= qty_ran3;
                                new_ran3();
                            }
                        }else if(sell_ran3 == 5){
                            if(userData.farm.pancakes >= qty_ran3){
                                total += qty_ran3*91;
                                userData.farm.pancakes -= qty_ran3;
                                new_ran3();
                            }
                        }else if(sell_ran3 == 6){
                            if(userData.farm.bread >= qty_ran3){
                                total += qty_ran3*6;
                                userData.farm.bread -= qty_ran3;
                                new_ran3();
                            }
                        }else if(sell_ran3 == 7){
                            if(userData.farm.french_bread >= qty_ran3){
                                total += qty_ran3*6;
                                userData.farm.french_bread -= qty_ran3;
                                new_ran3();
                            }
                        }else if(sell_ran3 == 8){
                            if(userData.farm.flatbread >= qty_ran3){
                                total += qty_ran3*6;
                                userData.farm.flatbread -= qty_ran3;
                                new_ran3();
                            }
                        }
    
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        if(total <= 0){await interaction.reply({ content: 'no food for sell!', ephemeral: true });return;}
                        showCoin = `+${total}🪙`;
                        userData.farm.coin += total;
                    }
                    
                    if(interaction.customId === 'renew_button'){
                        result = '❔';
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        add_ah_lerk.setDisabled(false);
                        add_ju.setDisabled(false);
                        add_khatna.setDisabled(false);
                        add_rice.setDisabled(false);
                        add_milk.setDisabled(false);
    
                        mix_buttton.setDisabled(false);
                        sell_button.setDisabled(false);
    
                        ah_lerk_amount = 0;
                        ju_amount = 0;
                        khatna_amount = 0;
                        rice_amount = 0;
                        milk_amount = 0;
                    }
    
                    if(interaction.customId === 'again_button'){
                        result = '❔';
                        if(userData.farm.pizza > 0){
                            pizza = `🍕${toSuperscript(userData.farm.pizza, userData.farm.pizza)}`;
                        }else{ pizza = ''; }
                        if(userData.farm.hamburger > 0){
                            hamburger = `🍔${toSuperscript(userData.farm.hamburger, userData.farm.hamburger)}`;
                        }else{ hamburger = ''; }
                        if(userData.farm.fries > 0){
                            fries = `🍟${toSuperscript(userData.farm.fries, userData.farm.fries)}`;
                        }else{ fries = ''; }
                        if(userData.farm.hotdog > 0){
                            hotdog = `🌭${toSuperscript(userData.farm.hotdog, userData.farm.hotdog)}`;
                        }else{ hotdog = ''; }
                        if(userData.farm.pancakes > 0){
                            pancakes = `🥞${toSuperscript(userData.farm.pancakes, userData.farm.pancakes)}`;
                        }else{ pancakes = ''; }
                        if(userData.farm.bread > 0){
                            bread = `🍞${toSuperscript(userData.farm.bread, userData.farm.bread)}`;
                        }else{ bread = ''; }
                        if(userData.farm.french_bread > 0){
                            french_bread = `🥖${toSuperscript(userData.farm.french_bread, userData.farm.french_bread)}`;
                        }else{ french_bread = ''; }
                        if(userData.farm.flatbread > 0){
                            flatbread = `🫓${toSuperscript(userData.farm.flatbread, userData.farm.flatbread)}`;
                        }else{ flatbread = ''; }
    
                        add_ah_lerk.setDisabled(false);
                        add_ju.setDisabled(false);
                        add_khatna.setDisabled(false);
                        add_rice.setDisabled(false);
                        add_milk.setDisabled(false);
    
                        mix_buttton.setDisabled(false);
                        sell_button.setDisabled(false);
                    }
    
                    setAmount = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('set_amount_rongjak')
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
                                label: `3`,
                                description: `Set amount to 3.`,
                                value: `three`
                            },
                            {
                                label: `5`,
                                description: `Set amount to 5.`,
                                value: `five`
                            },
                        ])
                    );
    
                    await interaction.update({ embeds: [embed.setDescription(`🏠: factory 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n👨‍🌾 🍉${toSuperscript(userData.farm.ah_lerk, userData.farm.ah_lerk)}🍇${toSuperscript(userData.farm.ju, userData.farm.ju)}🥦${toSuperscript(userData.farm.khatna, userData.farm.khatna)}🌾${toSuperscript(userData.farm.rice, userData.farm.rice)}🥛${toSuperscript(userData.farm.milk, userData.farm.milk)}${pizza}${hamburger}${fries}${hotdog}${pancakes}${bread}${french_bread}${flatbread}\n\n[${ah_lerk_amount}]🍉,...[${ju_amount}]🍇,...[${khatna_amount}]🥦,...[${rice_amount}]🌾,...[${milk_amount}]🥛\n\n>>>>>>>>>>>>>>[{${result}}]<<<<<<<<<<<<<<\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n\n**Customer need**\n[${for_sell}${toSuperscript(qty_ran, qty_ran)}], [${for_sell2}${toSuperscript(qty_ran2, qty_ran2)}], [${for_sell3}${toSuperscript(qty_ran3, qty_ran3)}] ${showCoin}`)], components: [setAmount, allButton_add, allButton] });
                    try{ await userData.save(); }catch(error){} 
                }catch(error){}
            });

            function new_ran(){
                sell_ran = getRandomInt(1, 9);
                qty_ran = getRandomInt(1, 6);
                userData.farm.for_sell = sell_ran;
                userData.farm.qty_sell = qty_ran;
                if(sell_ran == 1){
                    for_sell = '🍕';
                }else if(sell_ran == 2){
                    for_sell = '🍔';
                }else if(sell_ran == 3){
                    for_sell = '🍟';
                }else if(sell_ran == 4){
                    for_sell = '🌭';
                }else if(sell_ran == 5){
                    for_sell = '🥞';
                }else if(sell_ran == 6){
                    for_sell = '🍞';
                }else if(sell_ran == 7){
                    for_sell = '🥖';
                }else if(sell_ran == 8){
                    for_sell = '🫓';
                }
            }
            function new_ran2(){
                sell_ran2 = getRandomInt(1, 9);
                qty_ran2 = getRandomInt(1, 6);
                userData.farm.for_sell2 = sell_ran2;
                userData.farm.qty_sell2 = qty_ran2;
                if(sell_ran2 == 1){
                    for_sell2 = '🍕';
                }else if(sell_ran2 == 2){
                    for_sell2 = '🍔';
                }else if(sell_ran2 == 3){
                    for_sell2 = '🍟';
                }else if(sell_ran2 == 4){
                    for_sell2 = '🌭';
                }else if(sell_ran2 == 5){
                    for_sell2 = '🥞';
                }else if(sell_ran2 == 6){
                    for_sell2 = '🍞';
                }else if(sell_ran2 == 7){
                    for_sell2 = '🥖';
                }else if(sell_ran2 == 8){
                    for_sell2 = '🫓';
                }
            }
            function new_ran3(){
                sell_ran3 = getRandomInt(1, 9);
                qty_ran3 = getRandomInt(1, 6);
                userData.farm.for_sell3 = sell_ran3;
                userData.farm.qty_sell3 = qty_ran3;
                if(sell_ran3 == 1){
                    for_sell3 = '🍕';
                }else if(sell_ran3 == 2){
                    for_sell3 = '🍔';
                }else if(sell_ran3 == 3){
                    for_sell3 = '🍟';
                }else if(sell_ran3 == 4){
                    for_sell3 = '🌭';
                }else if(sell_ran3 == 5){
                    for_sell3 = '🥞';
                }else if(sell_ran3 == 6){
                    for_sell3 = '🍞';
                }else if(sell_ran3 == 7){
                    for_sell3 = '🥖';
                }else if(sell_ran3 == 8){
                    for_sell3 = '🫓';
                }
            }

        }catch(error){
            console.log(`rongjak error ${error}`);
        }
    },
};
