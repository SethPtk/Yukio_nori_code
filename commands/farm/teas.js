const { sleep, gif, getUser, getRandomInt, sym, cooldown, getCollectionButton, SimpleEmbed, customEmbed, ButtonStyle, fiveButton, fourButton, labelButton, toSuperscript} = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 60_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'teas',
    async execute(client, message, args) {
        try{
            if(args[0] != 'set' && args[0]){ return; }
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
            
            const choice = args[0];
            if(choice){
                if(choice == 'set'){
                    const choice_two = args[1];
                    if(choice_two == 'tree1'){
                        const emoji = args[2];
                        if(emoji.length >= 50){
                            return message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> try other emoji!`)] });
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has change tree1 to ${emoji}`)] });
                        userData.farm.tree1 = emoji;
                        try{ await userData.save(); }catch(error){} 
                        return;
                    }else if(choice_two == 'tree2'){
                        const emoji = args[2];
                        if(emoji.length >= 50){
                            return message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> try other emoji!`)] });
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has change tree2 to ${emoji}`)] });
                        userData.farm.tree2 = emoji;
                        try{ await userData.save(); }catch(error){} 
                        return;
                    }
                    return;
                }
                return;
            }

            let tree1 = userData.farm.tree1;
            let tree2 = userData.farm.tree2;

            const plan_button = labelButton('plan_button', 'Plan Seed 🌿', ButtonStyle.Success);
            const collect_button = labelButton('collect_button', 'Collect 🔪', ButtonStyle.Success);
            const sell_button = labelButton('sell_button', `Sell 🪙`, ButtonStyle.Primary);
            const pack_button = labelButton('pack_button', 'Pack', ButtonStyle.Danger);
            const allButton = fourButton(plan_button, collect_button, sell_button, pack_button);

            const pack_one = labelButton('pack_one', 'Pack One', ButtonStyle.Success);
            const pack_two = labelButton('pack_two', 'Pack Two', ButtonStyle.Success);
            const pack_three = labelButton('pack_three', 'Pack Three', ButtonStyle.Success);
            const pack_four = labelButton('pack_four', 'Pack Four', ButtonStyle.Success);
            const back_button = labelButton('back_button', 'Back', ButtonStyle.Danger);
            const Fourbutton = fiveButton(pack_one, pack_two, pack_three, pack_four, back_button);

            if(userData.farm.plan_bool){
                plan_button.setDisabled(true);
            }else{
                collect_button.setDisabled(true);
            }

            if(userData.farm.seed <= 0){
                plan_button.setDisabled(true);
            }

            if(userData.farm.seed_collect <= 0){
                sell_button.setDisabled(true);
            }

            let plan = '🟫';
            if(userData.farm.plan_type == '🍉'){
                plan = '🍉';
            }else if(userData.farm.plan_type == '🍇'){
                plan = '🍇';
            }else if(userData.farm.plan_type == '🥦'){
                plan = '🥦';
            }

            let ah_lerk = '';
            let ju = '';
            let khatna = '';

            if(userData.farm.ah_lerk > 0){
                ah_lerk = `🍉${toSuperscript(userData.farm.ah_lerk, userData.farm.ah_lerk)}`;
            }
            if(userData.farm.ju > 0){
                ju = `🍇${toSuperscript(userData.farm.ju, userData.farm.ju)}`;
            }
            if(userData.farm.khatna > 0){
                khatna = `🥦${toSuperscript(userData.farm.khatna, userData.farm.khatna)}`;
            }

            const embed = customEmbed()
                .setAuthor({ name: `${user.displayName}'s farm`, iconURL: user.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`🏠: Farm 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}...👨‍🌾...🚗🏡\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}📦${toSuperscript(userData.farm.seed_collect, userData.farm.seed_collect)}\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}${ah_lerk}${ju}${khatna}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}🪹${toSuperscript(userData.farm.seed, userData.farm.seed)}\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)
                .setTimestamp()
            const mgs = await message.channel.send({ embeds: [embed], components: [allButton] });

            const pack_embed = customEmbed()
                .setAuthor({ name: `${user.displayName}'s Packing`, iconURL: user.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`🏠: Packing 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n📦${toSuperscript(1, 1)}[${userData.farm.box_one}] 📦${toSuperscript(2, 2)}[${userData.farm.box_two}] 📦${toSuperscript(3, 3)}[${userData.farm.box_three}] 📦${toSuperscript(4, 4)}[${userData.farm.box_four}]\n\n1. 📦${toSuperscript(1, 1)} = 🥖[${userData.farm.french_bread}/5] 🍔[${userData.farm.hamburger}/3] 🍕[${userData.farm.pizza}/3]\n2. 📦${toSuperscript(2, 2)} = 🍟[${userData.farm.fries}/4] 🍇[${userData.farm.ju}/5] 🥞[${userData.farm.pancakes}/1]\n3. 📦${toSuperscript(3, 3)} = 🫓[${userData.farm.flatbread}/5] 🍞[${userData.farm.bread}/5] 🍉[${userData.farm.ah_lerk}/5]\n4. 📦${toSuperscript(4, 4)} = 🍉[${userData.farm.ah_lerk}/10] 🍇[${userData.farm.ju}/10] 🥦[${userData.farm.khatna}/10]\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)
                .setTimestamp()

            const collector = getCollectionButton(mgs, 300_000);
        
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
    
                    if(interaction.customId === 'plan_button'){
                        userData.farm.plan_bool = true;
                        userData.farm.seed -= 1;
                        const plan_ran = getRandomInt(1, 4);
                        if(plan_ran == 1){
                            plan = '🍉';
                            userData.farm.plan_type = '🍉';
                        }else if(plan_ran == 2){
                            plan = '🍇';
                            userData.farm.plan_type = '🍇';
                        }else if(plan_ran == 3){
                            plan = '🥦';
                            userData.farm.plan_type = '🥦';
                        }
    
                        if(userData.farm.ah_lerk > 0){
                            ah_lerk = `🍉${toSuperscript(userData.farm.ah_lerk, userData.farm.ah_lerk)}`;
                        }else{ ah_lerk = ''; }
                        if(userData.farm.ju > 0){
                            ju = `🍇${toSuperscript(userData.farm.ju, userData.farm.ju)}`;
                        }else{ ju = ''; }
                        if(userData.farm.khatna > 0){
                            khatna = `🥦${toSuperscript(userData.farm.khatna, userData.farm.khatna)}`;
                        }else{ khatna = ''; }
    
                        plan_button.setDisabled(true);
                        sell_button.setDisabled(true);
                        pack_button.setDisabled(true);
                        await interaction.update({ embeds: [embed.setDescription(`🏠: Farm 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n${tree1}${tree2}[🌱🌱🌱🌱🌱]${tree2}${tree1}...👨‍🌾...🚗🏡\n${tree1}${tree2}[🌱🌱🌱🌱🌱]${tree2}${tree1}📦${toSuperscript(userData.farm.seed_collect, userData.farm.seed_collect)}\n${tree1}${tree2}[🌱🌱🌱🌱🌱]${tree2}${tree1}${ah_lerk}${ju}${khatna}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}🪹${toSuperscript(userData.farm.seed, userData.farm.seed)}\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [allButton] });
                        await sleep(5000);
                        collect_button.setDisabled(false);
                        pack_button.setDisabled(false);
                        if(userData.farm.seed_collect > 0){
                            sell_button.setDisabled(false);
                        }
                        await interaction.editReply({ embeds: [embed.setDescription(`🏠: Farm 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}...👨‍🌾...🚗🏡\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}📦${toSuperscript(userData.farm.seed_collect, userData.farm.seed_collect)}\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}${ah_lerk}${ju}${khatna}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}🪹${toSuperscript(userData.farm.seed, userData.farm.seed)}\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [allButton] });
                    }
    
                    if(interaction.customId === 'collect_button'){
                        userData.farm.plan_bool = false;
                        if(userData.farm.plan_type == '🍉'){
                            userData.farm.ah_lerk += 6;
                        }else if(userData.farm.plan_type == '🍇'){
                            userData.farm.ju += 6;
                        }else if(userData.farm.plan_type == '🥦'){
                            userData.farm.khatna += 6;
                        }else{ khatna = ''; }
    
                        if(userData.farm.ah_lerk > 0){
                            ah_lerk = `🍉${toSuperscript(userData.farm.ah_lerk, userData.farm.ah_lerk)}`;
                        }else{ ah_lerk = ''; }
                        if(userData.farm.ju > 0){
                            ju = `🍇${toSuperscript(userData.farm.ju, userData.farm.ju)}`;
                        }else{ ju = ''; }
                        if(userData.farm.khatna > 0){
                            khatna = `🥦${toSuperscript(userData.farm.khatna, userData.farm.khatna)}`;
                        }
    
                        sell_button.setDisabled(false);
    
                        userData.farm.plan_type = '';
                        userData.farm.seed_collect += 1;
                        if(userData.farm.seed <= 0){
                            plan_button.setDisabled(true);
                        }else{
                            plan_button.setDisabled(false);
                        }
                        collect_button.setDisabled(true);
                        await interaction.update({ embeds: [embed.setDescription(`🏠: Farm 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n${tree1}${tree2}[🟫🟫🟫🟫🟫]${tree2}${tree1}...👨‍🌾...🚗🏡\n${tree1}${tree2}[🟫🟫🟫🟫🟫]${tree2}${tree1}📦${toSuperscript(userData.farm.seed_collect, userData.farm.seed_collect)}\n${tree1}${tree2}[🟫🟫🟫🟫🟫]${tree2}${tree1}${ah_lerk}${ju}${khatna}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}🪹${toSuperscript(userData.farm.seed, userData.farm.seed)}\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [allButton] });
                    }
    
                    if(interaction.customId === 'sell_button'){
                        if(userData.farm.seed_collect <= 0){
                            await interaction.reply({ content: 'no seed for sell!', ephemeral: true });
                            return;
                        }
    
                        sell_button.setDisabled(true);
    
                        const cash = userData.farm.seed_collect * 1;
                        userData.farm.seed_collect = 0;
    
                        userData.farm.coin += cash;
                        if(userData.farm.plan_bool){
                            plan_button.setDisabled(true);
                        }else{
                            collect_button.setDisabled(true);
                            plan = '🟫';
                        }
                        await interaction.update({ embeds: [embed.setDescription(`🏠: Farm 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}...👨‍🌾...🚗🏡\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}📦${toSuperscript(userData.farm.seed_collect, userData.farm.seed_collect)}\n${tree1}${tree2}[${plan}${plan}${plan}${plan}${plan}]${tree2}${tree1}${ah_lerk}${ju}${khatna}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}🪹${toSuperscript(userData.farm.seed, userData.farm.seed)}\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [allButton] });
                    }

                    if(interaction.customId === 'pack_button'){
                        await interaction.update({ embeds: [pack_embed.setDescription(`🏠: Packing 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n📦${toSuperscript(1, 1)}[${userData.farm.box_one}] 📦${toSuperscript(2, 2)}[${userData.farm.box_two}] 📦${toSuperscript(3, 3)}[${userData.farm.box_three}] 📦${toSuperscript(4, 4)}[${userData.farm.box_four}]\n\n1. 📦${toSuperscript(1, 1)} = 🥖[${userData.farm.french_bread}/5] 🍔[${userData.farm.hamburger}/3] 🍕[${userData.farm.pizza}/3]\n2. 📦${toSuperscript(2, 2)} = 🍟[${userData.farm.fries}/4] 🍇[${userData.farm.ju}/5] 🥞[${userData.farm.pancakes}/1]\n3. 📦${toSuperscript(3, 3)} = 🫓[${userData.farm.flatbread}/5] 🍞[${userData.farm.bread}/5] 🍉[${userData.farm.ah_lerk}/5]\n4. 📦${toSuperscript(4, 4)} = 🍉[${userData.farm.ah_lerk}/10] 🍇[${userData.farm.ju}/10] 🥦[${userData.farm.khatna}/10]\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [Fourbutton] });
                    }

                    if(interaction.customId === 'pack_one'){
                        if(userData.farm.french_bread < 5 || userData.farm.hamburger < 3 || userData.farm.pizza < 3){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }

                        userData.farm.french_bread -= 5;
                        userData.farm.hamburger -= 3;
                        userData.farm.pizza -= 3;

                        userData.farm.box_one += 1;

                        await interaction.update({ embeds: [pack_embed.setDescription(`🏠: Packing 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n📦${toSuperscript(1, 1)}[${userData.farm.box_one}] 📦${toSuperscript(2, 2)}[${userData.farm.box_two}] 📦${toSuperscript(3, 3)}[${userData.farm.box_three}] 📦${toSuperscript(4, 4)}[${userData.farm.box_four}]\n\n1. 📦${toSuperscript(1, 1)} = 🥖[${userData.farm.french_bread}/5] 🍔[${userData.farm.hamburger}/3] 🍕[${userData.farm.pizza}/3]\n2. 📦${toSuperscript(2, 2)} = 🍟[${userData.farm.fries}/4] 🍇[${userData.farm.ju}/5] 🥞[${userData.farm.pancakes}/1]\n3. 📦${toSuperscript(3, 3)} = 🫓[${userData.farm.flatbread}/5] 🍞[${userData.farm.bread}/5] 🍉[${userData.farm.ah_lerk}/5]\n4. 📦${toSuperscript(4, 4)} = 🍉[${userData.farm.ah_lerk}/10] 🍇[${userData.farm.ju}/10] 🥦[${userData.farm.khatna}/10]\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [Fourbutton] });
                    }

                    if(interaction.customId === 'pack_two'){
                        if(userData.farm.fries < 4 || userData.farm.ju < 5 || userData.farm.pancakes < 1){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }

                        userData.farm.fries -= 4;
                        userData.farm.ju -= 5;
                        userData.farm.pancakes -= 1;

                        userData.farm.box_two += 1;

                        await interaction.update({ embeds: [pack_embed.setDescription(`🏠: Packing 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n📦${toSuperscript(1, 1)}[${userData.farm.box_one}] 📦${toSuperscript(2, 2)}[${userData.farm.box_two}] 📦${toSuperscript(3, 3)}[${userData.farm.box_three}] 📦${toSuperscript(4, 4)}[${userData.farm.box_four}]\n\n1. 📦${toSuperscript(1, 1)} = 🥖[${userData.farm.french_bread}/5] 🍔[${userData.farm.hamburger}/3] 🍕[${userData.farm.pizza}/3]\n2. 📦${toSuperscript(2, 2)} = 🍟[${userData.farm.fries}/4] 🍇[${userData.farm.ju}/5] 🥞[${userData.farm.pancakes}/1]\n3. 📦${toSuperscript(3, 3)} = 🫓[${userData.farm.flatbread}/5] 🍞[${userData.farm.bread}/5] 🍉[${userData.farm.ah_lerk}/5]\n4. 📦${toSuperscript(4, 4)} = 🍉[${userData.farm.ah_lerk}/10] 🍇[${userData.farm.ju}/10] 🥦[${userData.farm.khatna}/10]\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [Fourbutton] });
                    }

                    if(interaction.customId === 'pack_three'){
                        if(userData.farm.flatbread < 5 || userData.farm.bread < 5 || userData.farm.ah_lerk < 5){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }

                        userData.farm.flatbread -= 5;
                        userData.farm.bread -= 5;
                        userData.farm.ah_lerk -= 5;

                        userData.farm.box_three += 1;

                        await interaction.update({ embeds: [pack_embed.setDescription(`🏠: Packing 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n📦${toSuperscript(1, 1)}[${userData.farm.box_one}] 📦${toSuperscript(2, 2)}[${userData.farm.box_two}] 📦${toSuperscript(3, 3)}[${userData.farm.box_three}] 📦${toSuperscript(4, 4)}[${userData.farm.box_four}]\n\n1. 📦${toSuperscript(1, 1)} = 🥖[${userData.farm.french_bread}/5] 🍔[${userData.farm.hamburger}/3] 🍕[${userData.farm.pizza}/3]\n2. 📦${toSuperscript(2, 2)} = 🍟[${userData.farm.fries}/4] 🍇[${userData.farm.ju}/5] 🥞[${userData.farm.pancakes}/1]\n3. 📦${toSuperscript(3, 3)} = 🫓[${userData.farm.flatbread}/5] 🍞[${userData.farm.bread}/5] 🍉[${userData.farm.ah_lerk}/5]\n4. 📦${toSuperscript(4, 4)} = 🍉[${userData.farm.ah_lerk}/10] 🍇[${userData.farm.ju}/10] 🥦[${userData.farm.khatna}/10]\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [Fourbutton] });
                    }

                    if(interaction.customId === 'pack_four'){
                        if(userData.farm.ah_lerk < 10 || userData.farm.ju < 10 || userData.farm.khatna < 10){
                            await interaction.reply({ content: 'not enough resoucre!', ephemeral: true });
                            return;
                        }

                        userData.farm.ah_lerk -= 10;
                        userData.farm.ju -= 10;
                        userData.farm.khatna -= 10;

                        userData.farm.box_four += 1;

                        await interaction.update({ embeds: [pack_embed.setDescription(`🏠: Packing 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n📦${toSuperscript(1, 1)}[${userData.farm.box_one}] 📦${toSuperscript(2, 2)}[${userData.farm.box_two}] 📦${toSuperscript(3, 3)}[${userData.farm.box_three}] 📦${toSuperscript(4, 4)}[${userData.farm.box_four}]\n\n1. 📦${toSuperscript(1, 1)} = 🥖[${userData.farm.french_bread}/5] 🍔[${userData.farm.hamburger}/3] 🍕[${userData.farm.pizza}/3]\n2. 📦${toSuperscript(2, 2)} = 🍟[${userData.farm.fries}/4] 🍇[${userData.farm.ju}/5] 🥞[${userData.farm.pancakes}/1]\n3. 📦${toSuperscript(3, 3)} = 🫓[${userData.farm.flatbread}/5] 🍞[${userData.farm.bread}/5] 🍉[${userData.farm.ah_lerk}/5]\n4. 📦${toSuperscript(4, 4)} = 🍉[${userData.farm.ah_lerk}/10] 🍇[${userData.farm.ju}/10] 🥦[${userData.farm.khatna}/10]\n\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [Fourbutton] });
                    }

                    if(interaction.customId === 'back_button'){
                        await interaction.update({ embeds: [embed.setDescription(`🏠: Farm 🪙: **${userData.farm.coin.toLocaleString()}** Level: ${userData.levelSystem.level}\n\n${sym}☁️       🌤️                       ☁️${sym}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n${tree1}${tree2}[🟫🟫🟫🟫🟫]${tree2}${tree1}...👨‍🌾...🚗🏡\n${tree1}${tree2}[🟫🟫🟫🟫🟫]${tree2}${tree1}📦${toSuperscript(userData.farm.seed_collect, userData.farm.seed_collect)}\n${tree1}${tree2}[🟫🟫🟫🟫🟫]${tree2}${tree1}${ah_lerk}${ju}${khatna}\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}🪹${toSuperscript(userData.farm.seed, userData.farm.seed)}\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`)], components: [allButton] });
                    } 

                    try{ await userData.save(); }catch(error){}
                }catch(error){}
            });

        }catch(error){
            console.log(`teas error ${error}`);
        }
    },
};
