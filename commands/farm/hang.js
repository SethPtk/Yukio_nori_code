const { sleep, gif, getUser, getRandomInt, sym, cooldown, getCollectionButton, SimpleEmbed, customEmbed, ButtonStyle, threeButton, labelButton, toSuperscript} = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 15_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'hang',
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

            const mention = message.mentions.users.first();
            if(mention){
                let userData = await getUser(mention.id);

                let tree1 = userData.farm.tree1;
                let tree2 = userData.farm.tree2;

                if(userData){
                    const slot1_button = labelButton('slot1_button', `Buy ${userData.farm.slot1}`, ButtonStyle.Success); if(userData.farm.slot1 == '❔'){ slot1_button.setDisabled(true) }
                    const slot2_button = labelButton('slot2_button', `Buy ${userData.farm.slot2}`, ButtonStyle.Success); if(userData.farm.slot2 == '❔'){ slot2_button.setDisabled(true) }
                    const slot3_button = labelButton('slot3_button', `Buy ${userData.farm.slot3}`, ButtonStyle.Success); if(userData.farm.slot3 == '❔'){ slot3_button.setDisabled(true) }
                    const allButton_one = threeButton(slot1_button, slot2_button, slot3_button);

                    const slot4_button = labelButton('slot4_button', `Buy ${userData.farm.slot4}`, ButtonStyle.Success); if(userData.farm.slot4 == '❔'){ slot4_button.setDisabled(true) }
                    const slot5_button = labelButton('slot5_button', `Buy ${userData.farm.slot5}`, ButtonStyle.Success); if(userData.farm.slot5 == '❔'){ slot5_button.setDisabled(true) }
                    const slot6_button = labelButton('slot6_button', `Buy ${userData.farm.slot6}`, ButtonStyle.Success); if(userData.farm.slot6 == '❔'){ slot6_button.setDisabled(true) }
                    const allButton_two = threeButton(slot4_button, slot5_button, slot6_button);

                    const embed = customEmbed()
                        .setAuthor({ name: `${mention.displayName}'s hang`, iconURL: mention.displayAvatarURL() })
                        .setColor('Aqua')
                        .setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)
                        .setTimestamp()
                    const mgs = await message.channel.send({ embeds: [embed], components: [allButton_one, allButton_two] });

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
                            let target = await getUser(interaction.member.user.id);
                            const userData = await getUser(mention.id);
                            if(!target){
                                await interaction.reply({ content: 'This button is not for you!', ephemeral: true });
                                return;
                            }
            
                            if(interaction.customId === 'slot1_button'){
                                if(target.farm.coin < userData.farm.slot1_price){
                                    await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                                    return;
                                }
                                if(userData.farm.slot1_amount == 0){
                                    slot1_button.setDisabled(true);
                                    slot1_button.setLabel('Buy ❔');
                                    await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                    return;
                                }
                                if(interaction.member.user.id == mention.id){ userData.farm.slot1_price = 0; }
                                const product_name = sell_product(userData.farm.slot1);
                                target.farm[`${product_name}`] += userData.farm.slot1_amount;
                                target.farm.coin -= userData.farm.slot1_price;
                                userData.farm.coin += userData.farm.slot1_price;
            
                                userData.farm.slot1 = '❔';
                                userData.farm.slot1_amount = 0;
                                userData.farm.slot1_price = 0;
                                slot1_button.setDisabled(true);
                                slot1_button.setLabel('Buy ❔');
                                await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                try{ await target.save(); await userData.save(); }catch(error){}
                            }
            
                            if(interaction.customId === 'slot2_button'){
                                if(target.farm.coin < userData.farm.slot2_price){
                                    await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                                    return;
                                }
                                if(userData.farm.slot2_amount == 0){
                                    slot2_button.setDisabled(true);
                                    slot2_button.setLabel('Buy ❔');
                                    await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                    return;
                                }
                                if(interaction.member.user.id == mention.id){ userData.farm.slot2_price = 0; }
                                const product_name = sell_product(userData.farm.slot2);
                                target.farm[`${product_name}`] += userData.farm.slot2_amount;
                                target.farm.coin -= userData.farm.slot2_price;
                                userData.farm.coin += userData.farm.slot2_price;
            
                                userData.farm.slot2 = '❔';
                                userData.farm.slot2_amount = 0;
                                userData.farm.slot2_price = 0;
                                slot2_button.setDisabled(true);
                                slot2_button.setLabel('Buy ❔');
                                await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                try{ await target.save(); await userData.save() }catch(error){}
                            }
            
                            if(interaction.customId === 'slot3_button'){
                                if(target.farm.coin < userData.farm.slot3_price){
                                    await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                                    return;
                                }
                                if(userData.farm.slot3_amount == 0){
                                    slot3_button.setDisabled(true);
                                    slot3_button.setLabel('Buy ❔');
                                    await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                    return;
                                }
                                if(interaction.member.user.id == mention.id){ userData.farm.slot3_price = 0; }
                                const product_name = sell_product(userData.farm.slot3);
                                target.farm[`${product_name}`] += userData.farm.slot3_amount;
                                target.farm.coin -= userData.farm.slot3_price;
                                userData.farm.coin += userData.farm.slot3_price;
            
                                userData.farm.slot3 = '❔';
                                userData.farm.slot3_amount = 0;
                                userData.farm.slot3_price = 0;
                                slot3_button.setDisabled(true);
                                slot3_button.setLabel('Buy ❔');
                                await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                try{ await target.save(); await userData.save() }catch(error){}
                            }
            
                            if(interaction.customId === 'slot4_button'){
                                if(target.farm.coin < userData.farm.slot4_price){
                                    await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                                    return;
                                }
                                if(userData.farm.slot4_amount == 0){
                                    slot4_button.setDisabled(true);
                                    slot4_button.setLabel('Buy ❔');
                                    await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                    return;
                                }
                                if(interaction.member.user.id == mention.id){ userData.farm.slot4_price = 0; }
                                const product_name = sell_product(userData.farm.slot4);
                                target.farm[`${product_name}`] += userData.farm.slot4_amount;
                                target.farm.coin -= userData.farm.slot4_price;
                                userData.farm.coin += userData.farm.slot4_price;
            
                                userData.farm.slot4 = '❔';
                                userData.farm.slot4_amount = 0;
                                userData.farm.slot4_price = 0;
                                slot4_button.setDisabled(true);
                                slot4_button.setLabel('Buy ❔');
                                await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                try{ await target.save(); await userData.save() }catch(error){}
                            }
            
                            if(interaction.customId === 'slot5_button'){
                                if(target.farm.coin < userData.farm.slot5_price){
                                    await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                                    return;
                                }
                                if(userData.farm.slot5_amount == 0){
                                    slot5_button.setDisabled(true);
                                    slot5_button.setLabel('Buy ❔');
                                    await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                    return;
                                }
                                if(interaction.member.user.id == mention.id){ userData.farm.slot5_price = 0; }
                                const product_name = sell_product(userData.farm.slot5);
                                target.farm[`${product_name}`] += userData.farm.slot5_amount;
                                target.farm.coin -= userData.farm.slot5_price;
                                userData.farm.coin += userData.farm.slot5_price;
            
                                userData.farm.slot5 = '❔';
                                userData.farm.slot5_amount = 0;
                                userData.farm.slot5_price = 0;
                                slot5_button.setDisabled(true);
                                slot5_button.setLabel('Buy ❔');
                                await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                try{ await target.save(); await userData.save() }catch(error){}
                            }
            
                            if(interaction.customId === 'slot6_button'){
                                if(target.farm.coin < userData.farm.slot6_price){
                                    await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                                    return;
                                }
                                if(userData.farm.slot6_amount == 0){
                                    slot6_button.setDisabled(true);
                                    slot6_button.setLabel('Buy ❔');
                                    await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                    return;
                                }
                                if(interaction.member.user.id == mention.id){ userData.farm.slot6_price = 0; }
                                const product_name = sell_product(userData.farm.slot6);
                                target.farm[`${product_name}`] += userData.farm.slot6_amount;
                                target.farm.coin -= userData.farm.slot6_price;
                                userData.farm.coin += userData.farm.slot6_price;
            
                                userData.farm.slot6 = '❔';
                                userData.farm.slot6_amount = 0;
                                userData.farm.slot6_price = 0;
                                slot6_button.setDisabled(true);
                                slot6_button.setLabel('Buy ❔');
                                await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                                try{ await target.save(); await userData.save() }catch(error){}
                            } 
                        }catch(error){}
                    });
                }
                return;
            }

            let tree1 = userData.farm.tree1;
            let tree2 = userData.farm.tree2;

            if(parseInt(args[0])){
                if(!args[1] && !args[2] && !args[3]){
                    return message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> Enter product, price, amount!`)] });
                }
                let price = parseInt(args[2]); if(price <= 0){ price = 1; }else if(price >= 50000){ price = 50000 };
                let amount = parseInt(args[3]); if(amount >= 500){ amount = 500; };

                let product = '';
                if(args[1] == 'seed' && userData.farm.seed > 0 && userData.farm.seed >= amount){
                    userData.farm.seed -= amount;
                    product = '🪹';
                }else if(args[1] == 'watermelon' && userData.farm.ah_lerk > 0 && userData.farm.ah_lerk >= amount){
                    userData.farm.ah_lerk -= amount;
                    product = '🍉';
                }else if(args[1] == 'grapes' && userData.farm.ju > 0 && userData.farm.ju >= amount){
                    userData.farm.ju -= amount;
                    product = '🍇';
                }else if(args[1] == 'broccoli' && userData.farm.khatna > 0 && userData.farm.khatna >= amount){
                    userData.farm.khatna -= amount;
                    product = '🥦';
                }else if(args[1] == 'rice' && userData.farm.rice > 0 && userData.farm.rice >= amount){
                    userData.farm.rice -= amount;
                    product = '🌾';
                }else if(args[1] == 'milk' && userData.farm.milk > 0 && userData.farm.milk >= amount){
                    userData.farm.milk -= amount;
                    product = '🥛';
                }else if(args[1] == 'pizza' && userData.farm.pizza > 0 && userData.farm.pizza >= amount){
                    userData.farm.pizza -= amount;
                    product = '🍕';
                }else if(args[1] == 'hamburger' && userData.farm.hamburger > 0 && userData.farm.hamburger >= amount){
                    userData.farm.hamburger -= amount;
                    product = '🍔';
                }else if(args[1] == 'fries' && userData.farm.fries > 0 && userData.farm.fries >= amount){
                    userData.farm.fries -= amount;
                    product = '🍟';
                }else if(args[1] == 'hotdog' && userData.farm.hotdog > 0 && userData.farm.hotdog >= amount){
                    userData.farm.hotdog -= amount;
                    product = '🌭';
                }else if(args[1] == 'pancakes' && userData.farm.pancakes > 0 && userData.farm.pancakes >= amount){
                    userData.farm.pancakes -= amount;
                    product = '🥞';
                }else if(args[1] == 'bread' && userData.farm.bread > 0 && userData.farm.bread >= amount){
                    userData.farm.bread -= amount;
                    product = '🍞';
                }else if(args[1] == 'french_bread' && userData.farm.french_bread > 0 && userData.farm.french_bread >= amount){
                    userData.farm.french_bread -= amount;
                    product = '🥖';
                }else if(args[1] == 'flatbread' && userData.farm.flatbread > 0 && userData.farm.flatbread >= amount){
                    userData.farm.flatbread -= amount;
                    product = '🫓';
                }else if(!product){
                    return message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> wrong name product, out of product, sold yet!`)] });
                }

                if(args[0] == 1 && userData.farm.slot1 == '❔'){
                    userData.farm.slot1 = product;
                    userData.farm.slot1_price = price;
                    userData.farm.slot1_amount = amount;
                }else if(args[0] == 2 && userData.farm.slot2 == '❔'){
                    userData.farm.slot2 = product;
                    userData.farm.slot2_price = price;
                    userData.farm.slot2_amount = amount;
                }else if(args[0] == 3 && userData.farm.slot3 == '❔'){
                    userData.farm.slot3 = product;
                    userData.farm.slot3_price = price;
                    userData.farm.slot3_amount = amount;
                }else if(args[0] == 4 && userData.farm.slot4 == '❔'){
                    userData.farm.slot4 = product;
                    userData.farm.slot4_price = price;
                    userData.farm.slot4_amount = amount;
                }else if(args[0] == 5 && userData.farm.slot5 == '❔'){
                    userData.farm.slot5 = product;
                    userData.farm.slot5_price = price;
                    userData.farm.slot5_amount = amount;
                }else if(args[0] == 6 && userData.farm.slot6 == '❔'){
                    userData.farm.slot6 = product;
                    userData.farm.slot6_price = price;
                    userData.farm.slot6_amount = amount;
                }else{
                    return message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> product didn't sold yet!`)] });
                }
                try{await userData.save();}catch(error){}
                return message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has added ${product} to slot${parseInt(args[0])} with price: ${price}🪙 amount: ${amount}`)] });
            }

            const slot1_button = labelButton('slot1_button', `Buy ${userData.farm.slot1}`, ButtonStyle.Success); if(userData.farm.slot1 == '❔'){ slot1_button.setDisabled(true) }
            const slot2_button = labelButton('slot2_button', `Buy ${userData.farm.slot2}`, ButtonStyle.Success); if(userData.farm.slot2 == '❔'){ slot2_button.setDisabled(true) }
            const slot3_button = labelButton('slot3_button', `Buy ${userData.farm.slot3}`, ButtonStyle.Success); if(userData.farm.slot3 == '❔'){ slot3_button.setDisabled(true) }
            const allButton_one = threeButton(slot1_button, slot2_button, slot3_button);

            const slot4_button = labelButton('slot4_button', `Buy ${userData.farm.slot4}`, ButtonStyle.Success); if(userData.farm.slot4 == '❔'){ slot4_button.setDisabled(true) }
            const slot5_button = labelButton('slot5_button', `Buy ${userData.farm.slot5}`, ButtonStyle.Success); if(userData.farm.slot5 == '❔'){ slot5_button.setDisabled(true) }
            const slot6_button = labelButton('slot6_button', `Buy ${userData.farm.slot6}`, ButtonStyle.Success); if(userData.farm.slot6 == '❔'){ slot6_button.setDisabled(true) }
            const allButton_two = threeButton(slot4_button, slot5_button, slot6_button);

            const embed = customEmbed()
                .setAuthor({ name: `${user.displayName}'s hang`, iconURL: user.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)
                .setTimestamp()
            const mgs = await message.channel.send({ embeds: [embed], components: [allButton_one, allButton_two] });

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
                    let target = await getUser(interaction.member.user.id);
                    userData = await getUser(user.id);
                    if(!target){
                        await interaction.reply({ content: 'This button is not for you!', ephemeral: true });
                        return;
                    }
    
                    if(interaction.customId === 'slot1_button'){
                        if(target.farm.coin < userData.farm.slot1_price){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.slot1_amount == 0){
                            slot1_button.setDisabled(true);
                            slot1_button.setLabel('Buy ❔');
                            await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                            return;
                        }
                        if(interaction.member.user.id == user.id){ userData.farm.slot1_price = 0; }
                        const product_name = sell_product(userData.farm.slot1);
                        target.farm[`${product_name}`] += userData.farm.slot1_amount;
                        target.farm.coin -= userData.farm.slot1_price;
                        userData.farm.coin += userData.farm.slot1_price;
    
                        userData.farm.slot1 = '❔';
                        userData.farm.slot1_amount = 0;
                        userData.farm.slot1_price = 0;
                        slot1_button.setDisabled(true);
                        slot1_button.setLabel('Buy ❔');
                        await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                        try{ await target.save(); await userData.save(); }catch(error){}
                    }
    
                    if(interaction.customId === 'slot2_button'){
                        if(target.farm.coin < userData.farm.slot2_price){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.slot2_amount == 0){
                            slot2_button.setDisabled(true);
                            slot2_button.setLabel('Buy ❔');
                            await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                            return;
                        }
                        if(interaction.member.user.id == user.id){ userData.farm.slot2_price = 0; }
                        const product_name = sell_product(userData.farm.slot2);
                        target.farm[`${product_name}`] += userData.farm.slot2_amount;
                        target.farm.coin -= userData.farm.slot2_price;
                        userData.farm.coin += userData.farm.slot2_price;
    
                        userData.farm.slot2 = '❔';
                        userData.farm.slot2_amount = 0;
                        userData.farm.slot2_price = 0;
                        slot2_button.setDisabled(true);
                        slot2_button.setLabel('Buy ❔');
                        await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                        try{ await target.save(); await userData.save() }catch(error){}
                    }
    
                    if(interaction.customId === 'slot3_button'){
                        if(target.farm.coin < userData.farm.slot3_price){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.slot3_amount == 0){
                            slot3_button.setDisabled(true);
                            slot3_button.setLabel('Buy ❔');
                            await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                            return;
                        }
                        if(interaction.member.user.id == user.id){ userData.farm.slot3_price = 0; }
                        const product_name = sell_product(userData.farm.slot3);
                        target.farm[`${product_name}`] += userData.farm.slot3_amount;
                        target.farm.coin -= userData.farm.slot3_price;
                        userData.farm.coin += userData.farm.slot3_price;
    
                        userData.farm.slot3 = '❔';
                        userData.farm.slot3_amount = 0;
                        userData.farm.slot3_price = 0;
                        slot3_button.setDisabled(true);
                        slot3_button.setLabel('Buy ❔');
                        await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                        try{ await target.save(); await userData.save() }catch(error){}
                    }
    
                    if(interaction.customId === 'slot4_button'){
                        if(target.farm.coin < userData.farm.slot4_price){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.slot4_amount == 0){
                            slot4_button.setDisabled(true);
                            slot4_button.setLabel('Buy ❔');
                            await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                            return;
                        }
                        if(interaction.member.user.id == user.id){ userData.farm.slot4_price = 0; }
                        const product_name = sell_product(userData.farm.slot4);
                        target.farm[`${product_name}`] += userData.farm.slot4_amount;
                        target.farm.coin -= userData.farm.slot4_price;
                        userData.farm.coin += userData.farm.slot4_price;
    
                        userData.farm.slot4 = '❔';
                        userData.farm.slot4_amount = 0;
                        userData.farm.slot4_price = 0;
                        slot4_button.setDisabled(true);
                        slot4_button.setLabel('Buy ❔');
                        await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                        try{ await target.save(); await userData.save() }catch(error){}
                    }
    
                    if(interaction.customId === 'slot5_button'){
                        if(target.farm.coin < userData.farm.slot5_price){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.slot5_amount == 0){
                            slot5_button.setDisabled(true);
                            slot5_button.setLabel('Buy ❔');
                            await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                            return;
                        }
                        if(interaction.member.user.id == user.id){ userData.farm.slot5_price = 0; }
                        const product_name = sell_product(userData.farm.slot5);
                        target.farm[`${product_name}`] += userData.farm.slot5_amount;
                        target.farm.coin -= userData.farm.slot5_price;
                        userData.farm.coin += userData.farm.slot5_price;
    
                        userData.farm.slot5 = '❔';
                        userData.farm.slot5_amount = 0;
                        userData.farm.slot5_price = 0;
                        slot5_button.setDisabled(true);
                        slot5_button.setLabel('Buy ❔');
                        await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                        try{ await target.save(); await userData.save() }catch(error){}
                    }
    
                    if(interaction.customId === 'slot6_button'){
                        if(target.farm.coin < userData.farm.slot6_price){
                            await interaction.reply({ content: 'not enough coin!', ephemeral: true });
                            return;
                        }
                        if(userData.farm.slot6_amount == 0){
                            slot6_button.setDisabled(true);
                            slot6_button.setLabel('Buy ❔');
                            await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                            return;
                        }
                        if(interaction.member.user.id == user.id){ userData.farm.slot6_price = 0; }
                        const product_name = sell_product(userData.farm.slot6);
                        target.farm[`${product_name}`] += userData.farm.slot6_amount;
                        target.farm.coin -= userData.farm.slot6_price;
                        userData.farm.coin += userData.farm.slot6_price;
    
                        userData.farm.slot6 = '❔';
                        userData.farm.slot6_amount = 0;
                        userData.farm.slot6_price = 0;
                        slot6_button.setDisabled(true);
                        slot6_button.setLabel('Buy ❔');
                        await interaction.update({ embeds: [embed.setDescription(`${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}\n\n✨🎟️[${userData.farm.slot1}${toSuperscript(userData.farm.slot1_amount)},${userData.farm.slot1_price}🪙],[${userData.farm.slot2}${toSuperscript(userData.farm.slot2_amount)},${userData.farm.slot2_price}🪙],[${userData.farm.slot3}${toSuperscript(userData.farm.slot3_amount)},${userData.farm.slot3_price}🪙]🎟️✨\n\n✨🎟️[${userData.farm.slot4}${toSuperscript(userData.farm.slot4_amount)},${userData.farm.slot4_price}🪙],[${userData.farm.slot5}${toSuperscript(userData.farm.slot5_amount)},${userData.farm.slot5_price}🪙],[${userData.farm.slot6}${toSuperscript(userData.farm.slot6_amount)},${userData.farm.slot6_price}🪙]🎟️✨\n\n${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}${tree1}${tree2}`)], components: [allButton_one, allButton_two]  });
                        try{ await target.save(); await userData.save() }catch(error){}
                    } 
                }catch(error){}
            });

            function sell_product(product){
                if(product == '🪹'){
                    return 'seed';
                }else if(product == '🍉'){
                    return 'ah_lerk';
                }else if(product == '🍇'){
                    return 'ju';
                }else if(product == '🥦'){
                    return 'khatna';
                }else if(product == '🌾'){
                    return 'rice';
                }else if(product == '🥛'){
                    return 'milk';
                }else if(product == '🍕'){
                    return 'pizza';
                }else if(product == '🍔'){
                    return 'hamburger';
                }else if(product == '🍟'){
                    return 'fries';
                }else if(product == '🌭'){
                    return 'hotdog';
                }else if(product == '🥞'){
                    return 'pancakes';
                }else if(product == '🍞'){
                    return 'bread';
                }else if(product == '🥖'){
                    return 'french_bread';
                }else if(product == '🫓'){
                    return 'flatbread';
                }
                return;
            }

        }catch(error){
            console.log(`hang error ${error}`);
        }
    },
};
