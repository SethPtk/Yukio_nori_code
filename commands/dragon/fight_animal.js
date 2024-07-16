const { SimpleEmbed, customEmbed, getUser, gif, getRandomInt, sleep, labelButton, ButtonStyle, twoButton, getCollectionButton, AttachmentBuilder, getimageAnimal, sym, cooldown } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 20_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'fight',
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

            if(userData.egg.equipe == ''){
                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> You don't have any animal`)] });
                return;
            }

            if(userData.quest.fight_point < 25){
                userData.quest.fight_point += 1;
            }

            const mgs = await message.channel.send({ embeds: [SimpleEmbed(`**Battle Loading...**`)] });

            let theme_battle = '';
            const theme_ran = getRandomInt(1, 5);
            if(theme_ran == 1){
                theme_battle = gif.animal_theme1;
            }else if(theme_ran == 2){
                theme_battle = gif.animal_theme2;
            }else if(theme_ran == 3){
                theme_battle = gif.animal_theme3;
            }else if(theme_ran == 4){
                theme_battle = gif.animal_theme4;
            }

            let K_K = '`';

            let our_team_name = `Your Animal`;
            let animal = '';
            let animal_png = '';
            let animal_level = '';
            let Level = '';
            let animal_HP = '';
            let animal_main_HP = '';
            let animal_power = '';
            let animal_SM = '';
            let animal_main_SM = '';

            const animalName = userData.egg.equipe.charAt(0).toUpperCase() + userData.egg.equipe.slice(1);

            if(animalName){
                animal = gif[`${animalName}_gif`];
                animal_png = gif[`${animalName}_png`];
                Level = userData.egg[animalName][`${animalName}_level`];
                animal_level = `🔰 **Level**: ${K_K}${Level}${K_K} `;
                animal_HP = userData.egg[animalName][`${animalName}_HP`];
                animal_power = userData.egg[animalName][`${animalName}_power`];
                animal_SM = userData.egg[animalName][`${animalName}_SM`];
            }

            let skill1 = '';
            let skill2 = '';
            let skill3 = '';
            let showSkill = '';

            let slow = false;
            let frezz_time = 3;
            let animal_skill1 = '';
            let animal_skill2 = '';
            let animal_skill3 = '';
            let get_skill = 0;

            if(Level >= 10){
                get_skill += 1;
                animal_skill1 = userData.egg[animalName][`${animalName}_skill1`];
                showSkill = '🔥 **SK**: ';
            }
            if(Level >= 20){
                get_skill += 1;
                animal_skill2 = userData.egg[animalName][`${animalName}_skill2`];
            }
            if(Level >= 30){
                get_skill += 1;
                animal_skill3 = userData.egg[animalName][`${animalName}_skill3`];
            }
            
            if(get_skill > 0){
                for(let i = 1; i <= get_skill; i++){
                    if(eval(`animal_skill${i}`) == 'defend'){
                        eval(`skill${i} = gif.defend_gif`);

                    }else if(eval(`animal_skill${i}`) == 'slow'){
                        eval(`skill${i} = gif.slow_gif`);

                    }else if(eval(`animal_skill${i}`) == 'vengeance'){
                        eval(`skill${i} = gif.vengean_gif`);

                    }else if(eval(`animal_skill${i}`) == 'life steal'){
                        eval(`skill${i} = gif.life_steal_gif`);

                    }else if(eval(`animal_skill${i}`) == 'health'){
                        eval(`skill${i} = gif.health_gif`);
                        animal_HP += parseInt(50*Level);

                    }else if(eval(`animal_skill${i}`) == 'demage'){
                        eval(`skill${i} = gif.demage_gif`);
                        animal_power += parseInt(10*Level);

                    }else if(eval(`animal_skill${i}`) == 'frezz'){
                        eval(`skill${i} = gif.frezz_gif`);

                    }else if(eval(`animal_skill${i}`) == 'double demage'){
                        eval(`skill${i} = gif.double_demage_gif`);

                    }else if(eval(`animal_skill${i}`) == 'critical'){
                        eval(`skill${i} = gif.critical_gif`);
                    }
                }
            }

            const opponent_ran = getRandomInt(0, 7);
            let animalTwoName;
            let show_enemy_skill = '';
            let opponent_name = 'Enemy';
            let opponent = '';
            let opponent_png = '';
            let opponent_level = '';
            let opponent_HP = 0;
            let opponent_main_HP = '';
            let opponent_power = 0;
            let opponent_SM = '';
            let opponent_main_SM = '';
            const winstrack = userData.egg.winstrack;
            let level_ran = getRandomInt(1+winstrack, 11+winstrack);

            if(opponent_ran == 0){
                const boss_ran = getRandomInt(1, 4);
                if(boss_ran == 1){
                    opponent = `${gif.boss1} BOSS`;
                    opponent_png = gif.boss1_png;
                    opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                    opponent_HP = 800*level_ran;
                    opponent_power = 10*level_ran;
                    opponent_SM = 20*level_ran;
                }else if(boss_ran == 2){
                    opponent = `${gif.boss2} BOSS`;
                    opponent_png = gif.boss2_png;
                    opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                    opponent_HP = 900*level_ran;
                    opponent_power = 15*level_ran;
                    opponent_SM = 30*level_ran;
                }else if(boss_ran == 3){
                    opponent = `${gif.boss3} BOSS`;
                    opponent_png = gif.boss3_png;
                    opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                    opponent_HP = 1000*level_ran;
                    opponent_power = 20*level_ran;
                    opponent_SM = 40*level_ran;
                }
            }else if(opponent_ran == 1){
                opponent = gif.enemy1;
                opponent_png = gif.enemy1_png;
                opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                opponent_HP = 100*level_ran;
                opponent_power = 5*level_ran;
                opponent_SM = 5*level_ran;
            }else if(opponent_ran == 2){
                opponent = gif.enemy2;
                opponent_png = gif.enemy2_png;
                opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                opponent_HP = 200*level_ran;
                opponent_power = (5*level_ran);
                opponent_SM = 10*level_ran;
            }else if(opponent_ran == 3){
                opponent = gif.enemy3;
                opponent_png = gif.enemy3_png;
                opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                opponent_HP = 300*level_ran;
                opponent_power = 5*level_ran;
                opponent_SM = 15*level_ran;
            }else if(opponent_ran == 4){
                opponent = gif.enemy4;
                opponent_png = gif.enemy4_png;
                opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                opponent_HP = 500*level_ran;
                opponent_power = (5*level_ran);
                opponent_SM = 20*level_ran;
            }else if(opponent_ran == 5){
                opponent = gif.enemy5;
                opponent_png = gif.enemy5_png;
                opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                opponent_HP = 600*level_ran;
                opponent_power = 5*level_ran;
                opponent_SM = 20*level_ran;
            }else if(opponent_ran == 6){
                opponent = gif.enemy6;
                opponent_png = gif.enemy6_png;
                opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                opponent_HP = 700*level_ran;
                opponent_power = 5*level_ran;
                opponent_SM = 20*level_ran;
            }
            

            ////////////////////////////////////////////////// ITEM SHOW
            let item = '';
            let immortal_store_health = 0;
            let immortal_store_SM = 0;
            let immortal_bool = false;

            if(userData.weapon.weapon_equipe == 'immortal'){
                if(userData.weapon.immortal_weapon == true){
                    item = ` ${gif.immortal_item_gif}`;
                    immortal_store_health = animal_HP;
                    immortal_store_SM = animal_SM;
                    immortal_bool = true;
                }
            }
            if(userData.weapon.weapon_equipe == 'critical'){
                if(userData.weapon.critical_weapon == true){
                    item = ` ${gif.critical_item_gif}`;
                }
            }else if(userData.weapon.weapon_equipe == 'life steal'){
                if(userData.weapon.life_steal_weapon == true){
                    item = ` ${gif.life_steal_item_gif}`;
                }
            }else if(userData.weapon.weapon_equipe == 'demage'){
                if(userData.weapon.demage_weapon == true){
                    item = ` ${gif.demage_item_gif}`;
                    animal_power += 500;
                }
            }else if(userData.weapon.weapon_equipe == 'defend'){
                if(userData.weapon.defend_weapon == true){
                    item = ` ${gif.defend_item_gif}`;
                }
            }else if(userData.weapon.weapon_equipe == 'mana'){
                if(userData.weapon.mana_weapon == true){
                    item = ` ${gif.mana_item_gif}`;
                    animal_SM += 1000;
                }
            }

            /////////////////////////////////////////////////// HOLDER ITEM
            let holder = '';
            const holding = userData.holder_item.holder_item_equipe;
            if(userData.holder_item.holder_item_bool == true){
                if(holding == 'immortal'){
                    holder = `${gif.holder_item_gif}(${gif.immortal_item_gif})`;
                    immortal_store_health = animal_HP;
                    immortal_store_SM = animal_SM;
                    immortal_bool = true;
                }else if(holding == 'critical'){
                    holder = `${gif.holder_item_gif}(${gif.critical_item_gif})`;
                }
                else if(holding == 'life steal'){
                    holder = `${gif.holder_item_gif}(${gif.life_steal_item_gif})`;
                }
                else if(holding == 'demage'){
                    holder = `${gif.holder_item_gif}(${gif.demage_item_gif})`;
                    animal_power += 500;
                }
                else if(holding == 'defend'){
                    holder = `${gif.holder_item_gif}(${gif.defend_item_gif})`;
                }
                else if(holding == 'mana'){
                    holder = `${gif.holder_item_gif}(${gif.mana_item_gif})`;
                    animal_SM += 1000;
                }
            }

            /////////////////////////////////////////////////// || PLAYER TWO ?????????????????????????????????????????????
            const playerTwo = message.mentions.users.first();
            
            let ply2_bool = false;
            let player2;
            let enemy_skill1 = '';
            let enemy_skill2 = '';
            let enemy_skill3 = '';
            let enemy_store_health = 0;
            let enemy_store_SN = 0;

            let ply2_item = '';
            let ply2_holder_item = '';
            let ply2_immortal_bool = false;
            let start = false;
            let enemyskill1 = '';
            let enemyskill2 = '';
            let enemyskill3 = '';
            let get_enemy_skill = 0;

            if(playerTwo){
                player2 = await getUser(playerTwo.id);
                if(!player2){
                    mgs.edit({ embeds: [SimpleEmbed(`Can't get <@${playerTwo.id}> didn't play any cmd!!`)], components: [] });
                    return;
                }
                if(playerTwo.id == user.id){
                    mgs.edit({ content: '**You can not fight yourself punk**', embeds: [] });
                    return;
                }

                player2 = await getUser(playerTwo.id);
                if(!player2){
                    mgs.edit({ content: '', embeds: [], components: [] });
                    return;
                }
                if(player2.egg.equipe == ''){
                    mgs.edit({content: '' ,embeds: [SimpleEmbed(`that user<@${playerTwo.id}> ot mean animal te!`)] });
                    return;
                }

                if(playerTwo){
                    our_team_name = `${user.displayName}`;
                    const embed = customEmbed()
                    .setAuthor({ name: `${user.displayName}`, iconURL: user.displayAvatarURL()})
                    .setDescription(`<@${playerTwo.id}> can you fight with <@${user.id}>`)
                    .setColor('Red')
                    .setImage('https://cdn.discordapp.com/attachments/1196390232027840553/1207696795824685056/battle.jpg?ex=65e0964a&is=65ce214a&hm=1ae02f6e6550c4ac53c8dfe1ea09efd78e419ef69913bdbf702ddfd881866697&')
                    .setTimestamp()

                    const button = labelButton('agree', 'Agree', ButtonStyle.Primary)
            
                    const button2 = labelButton('decline', 'Decline', ButtonStyle.Danger)

                    const row = twoButton(button, button2);

                    mgs.edit({ embeds: [embed], components: [row] });
                    
                    const collector = getCollectionButton(mgs, 60_000);

                    collector.on('end', () =>{ return; collector.stop() });

                    collector.on('collect', async (interaction) =>{
                        const targetID = playerTwo.id;
                        if (interaction.customId === 'decline'){
                            if(interaction.member.user.id === targetID || interaction.member.user.id === user.id){
                                mgs.edit({ content: `<@${interaction.member.user.id}> was **Decline** Request!`, embeds: [], components: []});
                                end = true;
                                userData.actiiveCD = false;
                                return;
                            }else{
                                await interaction.reply({content: `**You are not they Opponent**!!!`, ephemeral: true, });
                                return;
                            }
                        }
                        
                        if(interaction.customId === 'agree'){
                            if (interaction.member.user.id === targetID){
                                start = true;
                                mgs.edit({ content: `<@${interaction.member.user.id}> Battle start!`, embeds: [], components: []});
                    
                                ply2_bool = true;
                                opponent_name = `${playerTwo.displayName}`;
                                
                                animalTwoName = player2.egg.equipe.charAt(0).toUpperCase() + player2.egg.equipe.slice(1);
        
                                if(animalTwoName){
                                    opponent = gif[`${animalTwoName}_gif`];
                                    opponent_png = gif[`${animalTwoName}_two_png`];
                                    level_ran = player2.egg[animalTwoName][`${animalTwoName}_level`];
                                    opponent_level = `🔰 **Level**: ${K_K}${level_ran}${K_K} `;
                                    opponent_HP = player2.egg[animalTwoName][`${animalTwoName}_HP`];
                                    enemy_store_health = opponent_HP;
                                    opponent_power = player2.egg[animalTwoName][`${animalTwoName}_power`];
                                    opponent_SM = player2.egg[animalTwoName][`${animalTwoName}_SM`];
                                }

                                if(level_ran >= 10){
                                    get_enemy_skill += 1;
                                    enemyskill1 = player2.egg[animalTwoName][`${animalTwoName}_skill1`];
                                    show_enemy_skill = '🔥 **SK**: ';
                                }
                                if(level_ran >= 20){
                                    get_enemy_skill += 1;
                                    enemyskill2 = player2.egg[animalTwoName][`${animalTwoName}_skill2`];
                                }
                                if(level_ran >= 30){
                                    get_enemy_skill += 1;
                                    enemyskill3 = player2.egg[animalTwoName][`${animalTwoName}_skill3`];
                                }
                                
                                if(get_enemy_skill > 0){
                                    for(let i = 1; i <= get_enemy_skill; i++){
                                        if(eval(`enemyskill${i}`) == 'defend'){
                                            eval(`enemy_skill${i} = gif.defend_gif`);
                        
                                        }else if(eval(`enemyskill${i}`) == 'slow'){
                                            eval(`enemy_skill${i} = gif.slow_gif`);
                        
                                        }else if(eval(`enemyskill${i}`) == 'vengeance'){
                                            eval(`enemy_skill${i} = gif.vengean_gif`);
                        
                                        }else if(eval(`enemyskill${i}`) == 'life steal'){
                                            eval(`enemy_skill${i} = gif.life_steal_gif`);
                        
                                        }else if(eval(`enemyskill${i}`) == 'health'){
                                            eval(`enemy_skill${i} = gif.health_gif`);
                                            opponent_HP += parseInt(50*level_ran);
                        
                                        }else if(eval(`enemyskill${i}`) == 'demage'){
                                            eval(`enemy_skill${i} = gif.demage_gif`);
                                            opponent_power += parseInt(10*level_ran);
                        
                                        }else if(eval(`enemyskill${i}`) == 'frezz'){
                                            eval(`enemy_skill${i} = gif.frezz_gif`);
                        
                                        }else if(eval(`enemyskill${i}`) == 'double demage'){
                                            eval(`enemy_skill${i} = gif.double_demage_gif`);
                        
                                        }else if(eval(`enemyskill${i}`) == 'critical'){
                                            eval(`enemy_skill${i} = gif.critical_gif`);
                                        }
                                    }
                                }

                                if(player2.weapon.weapon_equipe == 'immortal'){
                                    ply2_item = gif.immortal_item_gif;
                                    enemy_store_health = animal_HP;
                                    enemy_store_SN = opponent_SM;
                                    ply2_immortal_bool = true;
                                }else if(player2.weapon.weapon_equipe == 'critical'){
                                    ply2_item = gif.critical_item_gif;
                                }else if(player2.weapon.weapon_equipe == 'life steal'){
                                    ply2_item = gif.life_steal_item_gif;
                                }else if(player2.weapon.weapon_equipe == 'demage'){
                                    ply2_item = gif.demage_item_gif;
                                    opponent_power += 500;
                                }else if(player2.weapon.weapon_equipe == 'defend'){
                                    ply2_item = gif.defend_item_gif;
                                }else if(player2.weapon.weapon_equipe == 'mana'){
                                    ply2_item = gif.mana_item_gif;
                                    opponent_SM += 1000;
                                }
                    
                                if(player2.holder_item.holder_item_bool == true){
                                    if(player2.holder_item.holder_item_equipe == 'immortal'){
                                        ply2_holder_item = `${gif.holder_item_gif}(${gif.immortal_item_gif})`;
                                        enemy_store_health = animal_HP;
                                        enemy_store_SN = opponent_SM;
                                        ply2_immortal_bool = true;
                                    }else if(player2.holder_item.holder_item_equipe == 'critical'){
                                        ply2_holder_item = `${gif.holder_item_gif}(${gif.critical_item_gif})`;
                                    }else if(player2.holder_item.holder_item_equipe == 'life steal'){
                                        ply2_holder_item = `${gif.holder_item_gif}(${gif.life_steal_item_gif})`;
                                    }else if(player2.holder_item.holder_item_equipe == 'demage'){
                                        opponent_power += 500;
                                        ply2_holder_item = `${gif.holder_item_gif}(${gif.defend_item_gif})`;
                                    }else if(player2.holder_item.holder_item_equipe == 'defend'){
                                        ply2_holder_item = `${gif.holder_item_gif}(${gif.defend_item_gif})`;
                                    }else if(player2.holder_item.holder_item_equipe == 'mana'){
                                        ply2_holder_item = `${gif.holder_item_gif}(${gif.mana_item_gif})`;
                                        opponent_SM += 1000;
                                    }
                                }
                                
                            }else{
                                await interaction.reply({content: `**You are not they Opponent**!!!`, ephemeral: true, });
                                return;
                            }
                        }
                    });
                }

                while(playerTwo && !start){
                    await sleep(1000);
                }
            }

            ////////////////////////////////////////////////// OPPONENT SKILL SHOW

            if(opponent_ran == 1 && ply2_bool == false){
                if(level_ran >= 20){
                    enemy_skill1 = `🔥 **SK**: ${gif.defend_gif}`;
                }
                if(level_ran >= 40){
                    enemy_skill2 = gif.life_steal_gif;
                }
                if(level_ran >= 60){
                    enemy_skill3 = gif.health_gif;
                    opponent_HP += 5000;
                }
            }
            let enemy_frezz_time = 3;
            if(opponent_ran == 2 && ply2_bool == false){
                if(level_ran >= 35){
                    enemy_skill1 = `🔥 **SK**: ${gif.vengean_gif}`;
                }
                if(level_ran >= 55){
                    enemy_skill2 = gif.critical_gif;
                }
                if(level_ran >= 75){
                    enemy_skill3 = gif.frezz_gif;
                }
            }
            let enemy_slow = false;
            if(opponent_ran == 3 && ply2_bool == false){
                if(level_ran >= 25){
                    enemy_skill1 = `🔥 **SK**: ${gif.slow_gif}`;
                }
                if(level_ran >= 45){
                    enemy_skill2 = gif.double_demage_gif;
                }
                if(level_ran >= 65){
                    enemy_skill3 = gif.vengean_gif;
                }
            }
            if(opponent_ran == 4 && ply2_bool == false){
                if(level_ran >= 30){
                    enemy_skill1 = `🔥 **SK**: ${gif.defend_gif}`;
                }
                if(level_ran >= 40){
                    enemy_skill2 = gif.life_steal_gif;
                }
                if(level_ran >= 60){
                    enemy_skill3 = gif.critical_gif;
                }
            }
            if(opponent_ran == 5 && ply2_bool == false){
                if(level_ran >= 10){
                    enemy_skill1 = `🔥 **SK**: ${gif.slow_gif}`;
                }
                if(level_ran >= 20){
                    enemy_skill2 = gif.life_steal_gif;
                }
                if(level_ran >= 30){
                    enemy_skill3 = gif.health_gif;
                    opponent_HP += 5000;
                }
            }
            if(opponent_ran == 6 && ply2_bool == false){
                if(level_ran >= 15){
                    enemy_skill1 = `🔥 **SK**: ${gif.health_gif}`;
                    opponent_HP += 5000;
                }
                if(level_ran >= 25){
                    enemy_skill2 = gif.life_steal_gif;
                }
                if(level_ran >= 35){
                    enemy_skill3 = gif.life_steal_gif;
                }
            }
            animal_main_HP = animal_HP;
            animal_main_SM = animal_SM;

            opponent_main_HP = opponent_HP;
            opponent_main_SM = opponent_SM;
            
            const attachment = new AttachmentBuilder(await getimageAnimal(animal_png, Level, animal_main_HP, animal_HP, animal_main_SM, animal_SM, our_team_name, opponent_png, level_ran, opponent_main_HP, opponent_HP, opponent_main_SM, opponent_SM, opponent_name, theme_battle), { name: 'level.png' });

            const embed = customEmbed()
                .setAuthor({ name: `${user.displayName} take a Sword`, iconURL: message.author.displayAvatarURL()})
                .addFields(
                    { name: `${our_team_name}`, value: `${animal_level}${animal}${item}\n❤️ **HP**: ${K_K}${animal_HP}${K_K} ${holder}\n💙 **SM**: ${K_K}${animal_SM}${K_K}\n⚔️ **PW**: ${K_K}${animal_power}${K_K}\n${showSkill}${skill1} ${skill2} ${skill3}`, inline: true },
                    { name: `${opponent_name}`, value: `${opponent_level}${opponent} ${ply2_item}\n❤️ **HP**: ${K_K}${opponent_HP}${K_K} ${ply2_holder_item}\n💙 **SM**: ${K_K}${opponent_SM}${K_K}\n⚔️ **PW**: ${K_K}${opponent_power}${K_K}\n${show_enemy_skill}${enemy_skill1} ${enemy_skill2} ${enemy_skill3}`, inline: true },
                )
                .setImage('attachment://level.png')
                .setFooter({ text: 'Ready!' })

                mgs.edit({ content: '', embeds: [embed], files: [attachment] });
            await sleep(3000);

            let wait = 0;
            let wait_bool = true;
            let fight_turn = 0;
            let description = 'animal: ';
            let description2 = 'enemy: ';

            while(animal_HP != 0 || opponent_HP != 0){
                fight_turn += 1;
                if(animal_HP <= 0 || opponent_HP <=0 ){
                    break;
                }
                opponent_SM -= 5;
                animal_HP -= opponent_power;

                /////////////////////////////////////////////////////////////////////////////// || ANIMAL SKILL
                if(get_skill > 0){
                    for(let i = 1; i <= get_skill; i++){
                        if(eval(`animal_skill${i}`) == 'defend'){
                            if(animal_SM > 0){
                                animal_SM -= 30;
                                animal_HP += parseInt(opponent_power/1.5);

                                description += 'defend ';
                            }

                        }
                        if(eval(`animal_skill${i}`) == 'slow'){
                            if(animal_SM > 0){
                                animal_SM -= 40;
                                if(slow == true){
                                    slow = false;
                                }
                                if(slow == false){
                                    animal_HP += parseInt(opponent_power / 2);
                                    slow = true;
                                }
                                description += 'slow ';
                            }
        
                        }
                        if(eval(`animal_skill${i}`) == 'vengeance'){
                            if(animal_SM > 0){
                                animal_SM -= 30;
                                const vengean_ran = getRandomInt(1, 3);
                                if(vengean_ran == 2){
                                    opponent_HP -= parseInt(opponent_power/1.5)
                                }

                                description += 'vengeance ';
                            }
                        }
                        if(eval(`animal_skill${i}`) == 'life steal'){
                            if(animal_SM > 0){
                                animal_SM -= 30;
                                animal_HP += (10*Level);

                                description += 'life steal ';
                            }
                        }
                        if(eval(`animal_skill${i}`) == 'frezz'){
                            if(animal_SM > 0){
                                animal_SM -= 40
                                const freez_ran = getRandomInt(1, 4);
                                if(freez_ran == 2){
                                    if(frezz_time <= 3 && frezz_time != 0){
                                        animal_HP += opponent_power;
                                        frezz_time -= 1;
                                    }
                                    if(frezz_time == 0){
                                        frezz_time = 3;
                                    }
                                }

                                description += 'frezz ';
                            }
                        }
                        if(eval(`animal_skill${i}`) == 'double demage'){
                            if(animal_SM > 0){
                                animal_SM -= 40;
                                const BD_ran = getRandomInt(1, 4);
                                if(BD_ran == 2){
                                    opponent_HP -= animal_power;
                                }

                                description += 'double demage ';
                            }
                        }
                        if(eval(`animal_skill${i}`) == 'critical'){
                            if(animal_SM > 0){
                                animal_SM -= 50;
                                const critical_ran = getRandomInt(1, 4);
                                opponent_HP -= parseInt(animal_power*critical_ran);

                                description += 'critical ';
                            }
                        }
                    }
                }
                animal_SM -= 5;
                opponent_HP -= animal_power;

                /////////////////////////////////////////////////////////////////////////////// || PLAYER TWO SKILL ????????????????????????????????????
                if(get_enemy_skill > 0){
                    for(let i = 1; i <= get_enemy_skill; i++){
                        if(eval(`enemyskill${i}`) == 'defend'){
                            if(opponent_SM > 0){
                                opponent_SM -= 30;
                                opponent_HP += parseInt(animal_power/1.5);

                                description2 = 'defend ';
                            }

                        }else if(eval(`enemyskill${i}`) == 'slow'){
                            if(opponent_SM > 0){
                                opponent_SM -= 40;
                                if(slow == true){
                                    slow = false;
                                }
                                if(slow == false){
                                    opponent_HP += parseInt(animal_power / 2);
                                    slow = true;
                                }

                                description2 = 'slow ';
                            }
        
                        }else if(eval(`enemyskill${i}`) == 'vengeance'){
                            if(opponent_SM > 0){
                                opponent_SM -= 30;
                                const vengean_ran = getRandomInt(1, 3);
                                if(vengean_ran == 2){
                                    animal_HP -= parseInt(animal_power/1.5)
                                }

                                description2 = 'vengeance ';
                            }
        
                        }else if(eval(`enemyskill${i}`) == 'life steal'){
                            if(opponent_SM > 0){
                                opponent_SM -= 30;
                                opponent_HP += (10*level_ran);

                                description2 = 'life steal ';
                            }
        
                        }else if(eval(`enemyskill${i}`) == 'frezz'){
                            if(opponent_SM > 0){
                                opponent_SM -= 40
                                const freez_ran = getRandomInt(1, 4);
                                if(freez_ran == 2){
                                    if(frezz_time <= 3 && frezz_time != 0){
                                        opponent_HP += animal_power;
                                        frezz_time -= 1;
                                    }
                                    if(frezz_time == 0){
                                        frezz_time = 3;
                                    }
                                }

                                description2 = 'frezz ';
                            }
        
                        }else if(eval(`enemyskill${i}`) == 'double demage'){
                            if(opponent_SM > 0){
                                opponent_SM -= 40;
                                const BD_ran = getRandomInt(1, 4);
                                if(BD_ran == 2){
                                    animal_HP -= opponent_power;
                                }

                                description2 = 'double demage ';
                            }
        
                        }else if(eval(`enemyskill${i}`) == 'critical'){
                            if(opponent_SM > 0){
                                opponent_SM -= 50;
                                const critical_ran = getRandomInt(1, 4);
                                animal_HP -= parseInt(opponent_power*critical_ran);

                                description2 = 'critical ';
                            }
                        }
                    }
                }

                /////////////////////////////////////////////////////////////////////////////// || OPPONENT SKILL
                if(opponent_ran == 1 && ply2_bool == false){
                    if(opponent_SM > 0){
                        if(level_ran >= 20){
                            opponent_SM -= 30;
                            opponent_HP += parseInt(animal_power/1.5);

                            description2 = 'defend ';
                        }
                    }else if(opponent_SM > 0){
                        if(level_ran >= 40){
                            opponent_SM -= 40;
                            opponent_HP += (10*level_ran);

                            description2 = 'life steal ';
                        }
                    }
                }
                if(opponent_ran == 2 && ply2_bool == false){
                    if(opponent_SM > 0){
                        if(level_ran >= 35){
                            opponent_SM -= 50;
                            animal_HP -= parseInt(animal_power/1.5)

                            description2 = 'vengeance ';
                        }
                    }else if(opponent_SM > 0){
                        if(level_ran >= 55){
                            opponent_SM -= 40;
                            const critical_ran = getRandomInt(1, 4);
                            animal_HP -= parseInt(opponent_power*critical_ran);

                            description2 = 'critical ';
                        }
                    }else if( opponent_SM > 0){
                        if(level_ran >= 75){
                            opponent_SM -= 50;
                            const freez_ran = getRandomInt(1, 4);
                            if(freez_ran == 2){
                                if(enemy_frezz_time <= 3 && enemy_frezz_time != 0){
                                    opponent_HP += animal_power;
                                    enemy_frezz_time -= 1;
                                }
                                if(frezz_time == 0){
                                    enemy_frezz_time = 3;
                                }
                            
                                description2 = 'frezz ';
                            }
                        }
                    }
                }
                if(opponent_ran == 3 && ply2_bool == false){
                    if(opponent_SM > 0){
                        if(level_ran >= 25){
                            opponent_SM -= 30;
                            if(enemy_slow == true){
                                enemy_slow = false;
                            }
                            if(enemy_slow == false){
                                opponent_HP += parseInt(animal_power / 2);
                                enemy_slow = true;
                            }

                            description2 = 'slow ';
                        }
                    }else if(opponent_SM > 0){
                        if(level_ran >= 45){
                            opponent_SM -= 40;
                            animal_HP -= opponent_power;

                            description2 = 'double demage ';
                        }
                    }else if(opponent_SM > 0){
                        if(level_ran >= 65){
                            opponent_SM -= 50;
                            const vengean_ran = getRandomInt(1, 3);
                            if(vengean_ran == 2){
                                animal_HP -= parseInt(animal_power/1.5)
                            }

                            description2 = 'vengeance';
                        }
                    }
                }
                if(opponent_ran == 4 && ply2_bool == false){
                    if(opponent_SM > 0){
                        if(level_ran >= 30){
                            opponent_SM -= 30;
                            opponent_HP += parseInt(animal_power/1.5);

                            description2 = 'defend ';
                        }
                    }else if(opponent_SM > 0){
                        if(level_ran >= 40){
                            opponent_SM -= 40;
                            opponent_HP += (10*level_ran);

                            description2 = 'life steal ';
                        }
                    }else if(opponent_SM > 0){
                        if(level_ran >= 60){
                            opponent_SM -= 50;
                            const critical_ran = getRandomInt(1, 4);
                            animal_HP -= parseInt(opponent_power*critical_ran);

                            description2 = 'critical ';
                        }
                    }
                }
                if(opponent_ran == 5 && ply2_bool == false){
                    if(opponent_SM > 0){
                        if(level_ran >= 10){
                            opponent_SM -= 30;
                            if(enemy_slow == true){
                                enemy_slow = false;
                            }
                            if(enemy_slow == false){
                                opponent_HP += parseInt(animal_power / 2);
                                enemy_slow = true;
                            }

                            description2 = 'slow ';
                        }
                    }else if(opponent_SM > 0){
                        if(level_ran >= 20){
                            opponent_SM -= 40;
                            opponent_HP += (10*level_ran);

                            description2 = 'life steal ';
                        }
                    }
                }
                if(opponent_ran == 6 && ply2_bool == false){
                    if(opponent_SM > 0){
                        if(level_ran >= 25){
                            opponent_SM -= 40;
                            opponent_HP += (10*level_ran);

                            description2 = 'life steal ';
                        }
                    }else if(opponent_SM > 0){
                        if(level_ran >= 35){
                            opponent_SM -= 50;
                            opponent_HP += (10*level_ran);

                            description2 = 'life steal ';
                        }
                    }
                }

                /////////////////////////////////////////////////////////////////////////////// || ITEM
                if(userData.weapon.weapon_equipe == 'immortal'){
                    if(userData.weapon.immortal_weapon == true){
                        if(animal_HP <= 0){
                            if(immortal_bool == true){
                                animal_HP += immortal_store_health;
                                const fill_SN = (immortal_store_SM - animal_SM);
                                animal_SM += fill_SN;
                                item = ` ${gif.immortal_item_broke_gif}`;
                                immortal_bool = false;
                            }
                        }
                    }
                }
                if(userData.weapon.weapon_equipe == 'critical'){
                    if(userData.weapon.critical_weapon == true && animal_SM > 0){
                        animal_SM -= 20;
                        const critical_item_ran = getRandomInt(2, 4);
                        opponent_HP -= parseInt(animal_power*critical_item_ran);
                    }
                }
                if(userData.weapon.weapon_equipe == 'life steal'){
                    if(userData.weapon.life_steal_weapon == true && animal_SM > 0){
                        animal_SM -= 20;
                        animal_HP += 250;
                    }
                }
                if(userData.weapon.weapon_equipe == 'defend'){
                    if(userData.weapon.life_steal_weapon == true && animal_SM > 0){
                        animal_SM -= 10;
                        animal_HP += parseInt(opponent_power/2);
                    }
                }

                ///////////////////////////////////////////////////////////////////////////////////////////// || PLAYER TWO ITEM
                if(ply2_bool){
                    if(player2.weapon.weapon_equipe == 'immortal'){
                        if(player2.weapon.immortal_weapon == true){
                            if(opponent_HP <= 0){
                                if(ply2_immortal_bool == true){
                                    opponent_HP += enemy_store_health;
                                    const fill_SN = (enemy_store_SN - opponent_SM);
                                    opponent_SM += fill_SN;
                                    ply2_item = ` ${gif.immortal_item_broke_gif}`;
                                    ply2_immortal_bool = false;
                                }
                            }
                        }
                    }
                    if(player2.weapon.weapon_equipe == 'critical'){
                        if(player2.weapon.critical_weapon == true && opponent_SM > 0){
                            opponent_SM -= 20;
                            const critical_item_ran = getRandomInt(2, 4);
                            animal_HP -= parseInt(opponent_power*critical_item_ran);
                        }
                    }
                    if(player2.weapon.weapon_equipe == 'life steal'){
                        if(player2.weapon.life_steal_weapon == true && opponent_SM > 0){
                            opponent_SM -= 20;
                            opponent_HP += 250;
                        }
                    }
                    if(player2.weapon.weapon_equipe == 'defend'){
                        if(player2.weapon.life_steal_weapon == true && opponent_SM > 0){
                            opponent_SM -= 10;
                            opponent_HP += parseInt(animal_power/2);
                        }
                    }
                }

                ///////////////////////////////////////////////////////////////////////////////////////////// || HOLDER ITEM

                if(userData.holder_item.holder_item_bool == true){
                    if(userData.holder_item.holder_item_equipe == 'immortal'){
                        if(animal_HP <= 0){
                            if(immortal_bool == true){
                                animal_HP += immortal_store_health;
                                const fill_SN = (immortal_store_SM - animal_SM);
                                animal_SM += fill_SN;
                                holder = `${gif.holder_item_gif}(${gif.immortal_item_broke_gif})`;
                                immortal_bool = false;
                            }
                        }
                    }
                }
                if(userData.holder_item.holder_item_bool == true){
                    if(userData.holder_item.holder_item_equipe == 'critical' && animal_SM > 0){
                        animal_SM -= 20;
                        const critical_item_ran = getRandomInt(2, 4);
                        opponent_HP -= parseInt(animal_power*critical_item_ran);
                    }
                }
                if(userData.holder_item.holder_item_bool == true){
                    if(userData.holder_item.holder_item_equipe == 'life steal'  && animal_SM > 0){
                        animal_SM -= 20;
                        animal_HP += 250;
                    }
                }
                if(userData.holder_item.holder_item_bool == true){
                    if(userData.holder_item.holder_item_equipe == 'defend' && animal_SM > 0){
                        animal_SM -= 10;
                        animal_HP += parseInt(opponent_power/2);
                    }
                }

                ///////////////////////////////////////////////////////////////////////////////////////////////// || PLAYER TWO HOLDER ITEM
                if(ply2_bool == true){
                    if(player2.holder_item.holder_item_bool == true){
                        if(player2.holder_item.holder_item_equipe == 'immortal'){
                            if(opponent_HP <= 0){
                                if(ply2_immortal_bool == true){
                                    opponent_HP += enemy_store_health;
                                    const fill_SN = (enemy_store_SN - opponent_SM);
                                    opponent_SM += fill_SN;
                                    ply2_holder_item = `${gif.holder_item_gif}(${gif.immortal_item_broke_gif})`;
                                    ply2_immortal_bool = false;
                                }
                            }
                        }
                        if(player2.holder_item.holder_item_equipe == 'critical' && opponent_SM > 0){
                            opponent_SM -= 20;
                            const critical_item_ran = getRandomInt(2, 4);
                            animal_HP -= parseInt(opponent_power*critical_item_ran);
                        }
                        if(player2.holder_item.holder_item_equipe == 'life steal' && opponent_SM > 0){
                            opponent_SM -= 20;
                            opponent_HP += 250;
                        }
                        if(player2.holder_item.holder_item_equipe == 'defend' && opponent_SM > 0){
                            opponent_SM -= 10;
                            opponent_HP += parseInt(animal_power/2);
                        }
                    }
                }

                if(animal_HP <= 0){
                    animal_HP = 0;
                }
                if(animal_SM <= 0){
                    animal_SM = 0;
                }
                if(opponent_HP <= 0){
                    opponent_HP = 0;
                }
                if(opponent_SM <= 0){
                    opponent_SM = 0;
                }

                description = 'animal: ';
                description2 = 'enemy: ';
            }

            if(animal_HP == 0){
                /////////////////////////////////////ANIMAL
                if(animal_png == gif[`${animalName}_png`]){
                    animal_png = gif[`${animalName}_dead_png`];
                }
            }else if(opponent_HP == 0){
                /////////////////////////////////////BOSS
                if(opponent_png == gif.boss1_png){
                    opponent_png = gif.boss1_dead_png;
                }else if(opponent_png == gif.boss2_png){
                    opponent_png = gif.boss2_dead_png;
                }else if(opponent_png == gif.boss3_png){
                    opponent_png = gif.boss3_dead_png;
                }
                ////////////////////////////////////ENEMY
                if(opponent_png == gif.enemy1_png){
                    opponent_png = gif.enemy1_dead_png;
                }else if(opponent_png == gif.enemy2_png){
                    opponent_png = gif.enemy2_dead_png;
                }else if(opponent_png == gif.enemy3_png){
                    opponent_png = gif.enemy3_dead_png;
                }else if(opponent_png == gif.enemy4_png){
                    opponent_png = gif.enemy4_dead_png;
                }else if(opponent_png == gif.enemy5_png){
                    opponent_png = gif.enemy5_dead_png;
                }else if(opponent_png == gif.enemy6_png){
                    opponent_png = gif.enemy6_dead_png;
                }
                ////////////////////////////////////PLATER TWO
                if(opponent_png == gif[`${animalTwoName}_two_png`]){
                    opponent_png = gif[`${animalTwoName}_two_dead_png`];
                }
            }

            if(animal_HP <= 0 && opponent_HP <= 0){

                let winstrack = '';
                if(userData.egg.winstrack > 0){
                    winstrack = `, your win strack ${userData.egg.winstrack}`;
                }

                const attachment = new AttachmentBuilder(await getimageAnimal(animal_png, Level, animal_main_HP, animal_HP, animal_main_SM, animal_SM, our_team_name, opponent_png, level_ran, opponent_main_HP, opponent_HP, opponent_main_SM, opponent_SM, opponent_name, theme_battle), { name: 'level.png' });

                const result = customEmbed()
                .setAuthor({ name: `${user.displayName} take a Sword`, iconURL: message.author.displayAvatarURL()})
                .setColor('White')
                .addFields(
                    { name: `${our_team_name}`, value: `${animal_level}${animal}${item}\n❤️ **HP**: ${K_K}${animal_HP}${K_K} ${holder}\n💙 **SM**: ${K_K}${animal_SM}${K_K}\n⚔️ **PW**: ${K_K}${animal_power}${K_K}\n${showSkill}${skill1} ${skill2} ${skill3}`, inline: true },
                    { name: `${opponent_name}`, value: `${opponent_level}${opponent} ${ply2_item}\n❤️ **HP**: ${K_K}${opponent_HP}${K_K} ${ply2_holder_item}\n💙 **SM**: ${K_K}${opponent_SM}${K_K}\n⚔️ **PW**: ${K_K}${opponent_power}${K_K}\n${show_enemy_skill}${enemy_skill1} ${enemy_skill2} ${enemy_skill3}`, inline: true },
                )
                .setImage('attachment://level.png')
                .setFooter({ text: `${fight_turn} Turn You smer${winstrack}`})

                try{ await mgs.edit({ embeds: [result], files: [attachment] }); }catch(error){}

            }else if(animal_HP <= 0){

                let winstrack = '';
                if(userData.egg.winstrack > 0){
                    winstrack = `, you lose your win strack ${userData.egg.winstrack}`;
                }

                let esen = parseInt((100*fight_turn)/2);
                if(ply2_bool){
                    esen = 0;
                }

                const attachment = new AttachmentBuilder(await getimageAnimal(animal_png, Level, animal_main_HP, animal_HP, animal_main_SM, animal_SM, our_team_name, opponent_png, level_ran, opponent_main_HP, opponent_HP, opponent_main_SM, opponent_SM, opponent_name, theme_battle), { name: 'level.png' });

                const result = customEmbed()
                .setAuthor({ name: `${user.displayName} take a Sword`, iconURL: message.author.displayAvatarURL()})
                .setColor('Red')
                .addFields(
                    { name: `${our_team_name}`, value: `${animal_level}${animal}${item}\n❤️ **HP**: ${K_K}${animal_HP}${K_K} ${holder}\n💙 **SM**: ${K_K}${animal_SM}${K_K}\n⚔️ **PW**: ${K_K}${animal_power}${K_K}\n${showSkill}${skill1} ${skill2} ${skill3}`, inline: true },
                    { name: `${opponent_name}`, value: `${opponent_level}${opponent} ${ply2_item}\n❤️ **HP**: ${K_K}${opponent_HP}${K_K} ${ply2_holder_item}\n💙 **SM**: ${K_K}${opponent_SM}${K_K}\n⚔️ **PW**: ${K_K}${opponent_power}${K_K}\n${show_enemy_skill}${enemy_skill1} ${enemy_skill2} ${enemy_skill3}`, inline: true },
                )
                .setImage('attachment://level.png')
                .setFooter({ text: `${fight_turn} Turn You lose and got Esen: ${esen.toLocaleString()}${winstrack}`})

                try{ await mgs.edit({ embeds: [result], files: [attachment] }); }catch(error){}

                if(!ply2_bool){
                    userData.egg.esen += esen;
                    userData.egg.winstrack = 0;
                }
            }else{
                if(!ply2_bool){
                    userData.egg.winstrack += 1;
                }
                let winstrack = '';
                if(userData.egg.winstrack > 0){
                    winstrack = `, your win strack ${userData.egg.winstrack}`;
                }

                let esen = parseInt((100*fight_turn)+(userData.egg.winstrack*100));
                if(ply2_bool){
                    esen = 0;
                }

                const attachment = new AttachmentBuilder(await getimageAnimal(animal_png, Level, animal_main_HP, animal_HP, animal_main_SM, animal_SM, our_team_name, opponent_png, level_ran, opponent_main_HP, opponent_HP, opponent_main_SM, opponent_SM, opponent_name, theme_battle), { name: 'level.png' });

                const result = customEmbed()
                .setAuthor({ name: `${user.displayName} take a Sword`, iconURL: message.author.displayAvatarURL()})
                .setColor('Green')
                .addFields(
                    { name: `${our_team_name}`, value: `${animal_level}${animal}${item}\n❤️ **HP**: ${K_K}${animal_HP}${K_K} ${holder}\n💙 **SM**: ${K_K}${animal_SM}${K_K}\n⚔️ **PW**: ${K_K}${animal_power}${K_K}\n${showSkill}${skill1} ${skill2} ${skill3}`, inline: true },
                    { name: `${opponent_name}`, value: `${opponent_level}${opponent} ${ply2_item}\n❤️ **HP**: ${K_K}${opponent_HP}${K_K} ${ply2_holder_item}\n💙 **SM**: ${K_K}${opponent_SM}${K_K}\n⚔️ **PW**: ${K_K}${opponent_power}${K_K}\n${show_enemy_skill}${enemy_skill1} ${enemy_skill2} ${enemy_skill3}`, inline: true },
                )
                .setImage('attachment://level.png')
                .setFooter({ text: `${fight_turn} Turn You win and got Esen: ${esen.toLocaleString()}${winstrack}`})

                try{ await mgs.edit({ embeds: [result], files: [attachment] }); }catch(error){}

                if(!ply2_bool){
                    userData.egg.esen += esen;
                }
                await sleep(2000);

                if(!ply2_bool){
                    if(userData.egg.winstrack == 10){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> **WinStrack 10** you recieve ${gif.esen_gif} **2,000**!\nyou recieve ${gif.cash} **2,000**!`)] });
                        userData.egg.esen += 2000;
                        userData.balance += 2000;
                    }else if(userData.egg.winstrack == 20){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> **WinStrack 20** you recieve ${gif.esen_gif} **5,000**!\nyou recieve ${gif.cash} **5,000**!`)] });
                        userData.egg.esen += 5000;
                        userData.balance += 5000;
                    }else if(userData.egg.winstrack == 30){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> **WinStrack 30** you recieve ${gif.esen_gif} **10,000**!\nyou recieve ${gif.cash} **10,000**!`)] });
                        userData.egg.esen += 10000;
                        userData.balance += 10000;
                    }else if(userData.egg.winstrack == 40){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> **WinStrack 40** you recieve ${gif.esen_gif} **20,000**!\nyou recieve ${gif.cash} **20,000**!`)] });
                        userData.egg.esen += 20000;
                        userData.balance += 20000;
                    }else if(userData.egg.winstrack == 50){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> **WinStrack 50** you recieve ${gif.esen_gif} **100,000**!\nyou recieve ${gif.cash} **100,000**!`)] });
                        userData.egg.esen += 100000;
                        userData.balance += 100000;
                    }else if(userData.egg.winstrack > 50 && userData.egg.winstrack % 10 == 0){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> **WinStrack Higher** you recieve ${gif.esen_gif} **500,000**!\nyou recieve ${gif.cash} **500,000**!`)] });
                        userData.egg.esen += 500000;
                        userData.balance += 500000;
                    }
                }
            }

            try{ await userData.save(); }catch(error){}
            return;
        }catch(error){
            console.log(`fight dragon error ${error}`);
        }
    },
};