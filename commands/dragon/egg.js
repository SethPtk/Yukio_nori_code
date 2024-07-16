const { SimpleEmbed, getUser, gif, getRandomInt, sleep, sym, cooldown } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'egg',
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

            if(message.content.includes('equip')){
                let animal = args[1];
                
                if(!['Shiny' ,'shiny', 'rutr', 'Rutr', 'nicy', 'Nicy', 'fegar', 'Fegar', 'megagengar', 'Megagengar', 'onix', 'Onix', 'furfrou', 'Furfrou', 'Bee', 'bee', 'Elekid', 'elekid', 'Metapod', 'metapod', 'Sandshrew', 'sandshrew'].includes(animal)){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> Please enter name of egg`)] });
                    await userData.save();
                    return;
                }

                let animal_gif = '';

                const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
                const name = animal.toLowerCase();
                if(userData.egg[animalName][`${animalName}_bool`] == false){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> don't have this animal ${gif[`${animalName}_gif`]}`)] });
                    return;
                }
                animal_gif = gif[`${animalName}_gif`];
                animal = name;

                if(animal == userData.egg.equipe.toLowerCase()){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you already equiped that egg ${gif[`${animalName}_gif`]}!`)] });
                    return;
                }

                userData.egg.equipe = name;

                message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you equip new egg ${animal_gif}!`)] });

                userData.levelSystem.xp += 10;

                await userData.save();
                return;
            }

            if(message.content.includes('open')){
                
                if(userData.egg.egg_amount <= 0){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> you don't have any ${gif.egg_gif}`)] });
                    await userData.save();
                    return;
                }

                const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> opening an ${gif.egg_gif}...`)] });
                await sleep(2000);
                userData.egg.egg_amount -= 1;

                let egg = '';
                let egg_name = '';

                const luck = getRandomInt(1, 11);
                if(luck == 1){
                    const rank_L = getRandomInt(1, 5);
                    if(rank_L == 1){
                        if(userData.egg.Fegar.Fegar_bool == true){
                            userData.egg.esen += 5000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Fegar_gif}: Fegar and you got ${gif.esen_gif}x**5,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Fegar_gif;
                        egg_name = 'Fegar';
                        userData.egg.Fegar.Fegar_bool = true;

                    }else if(rank_L == 2){
                        if(userData.egg.Megagengar.Megagengar_bool == true){
                            userData.egg.esen += 5000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Megagengar_gif}: Megagengar and you got ${gif.esen_gif}x**5,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Megagengar_gif;
                        egg_name = 'Megagengar';
                        userData.egg.Megagengar.Megagengar_bool = true;

                    }else if(rank_L == 3){
                        if(userData.egg.Shiny.Shiny_bool == true){
                            userData.egg.esen += 5000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Shiny_gif}: shiny and you got ${gif.esen_gif}x**5,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Shiny_gif;
                        egg_name = 'shiny';
                        userData.egg.Shiny.Shiny_bool = true;

                    }else if(rank_L == 4){
                        if(userData.egg.Sandshrew.Sandshrew_bool == true){
                            userData.egg.esen += 5000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Sandshrew_gif}: sandshrew and you got ${gif.esen_gif}x**5,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Sandshrew_gif;
                        egg_name = 'sandshrew';
                        userData.egg.Sandshrew.Sandshrew_bool = true;
                    }

                }else if(luck >= 2 && luck <= 5){
                    const rank_e = getRandomInt(1, 4);
                    if(rank_e == 1){
                        if(userData.egg.Nicy.Nicy_bool == true){
                            userData.egg.esen += 2000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Nicy_gif}: Nicy and you got ${gif.esen_gif}x**2,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Nicy_gif;
                        egg_name = 'Nicy';
                        userData.egg.Nicy.Nicy_bool = true;
                    }else if(rank_e == 2){
                        if(userData.egg.Onix.Onix_bool == true){
                            userData.egg.esen += 2000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Onix_gif}: Onix and you got ${gif.esen_gif}x**2,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Onix_gif;
                        egg_name = 'Onix';
                        userData.egg.Onix.Onix_bool = true;
                    }else if(rank_e == 3){
                        if(userData.egg.Elekid.Elekid_bool == true){
                            userData.egg.esen += 2000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Elekid_gif}: Elekid and you got ${gif.esen_gif}x**2,000**`)] });
                            return;
                        }
                        egg = gif.Elekid_gif;
                        egg_name = 'elekid';
                        userData.egg.Elekid.Elekid_bool = true;
                    }

                }else if(luck >= 6 && luck <= 10){
                    const rank_r = getRandomInt(1, 5);
                    if(rank_r == 1){
                        if(userData.egg.Rutr.Rutr_bool == true){
                            userData.egg.esen += 1000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Rutr_gif}: Rutr and you got ${gif.esen_gif}x**1,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Rutr_gif;
                        egg_name = 'Rutr';
                        userData.egg.Rutr.Rutr_bool = true;

                    }else if(rank_r == 2){
                        if(userData.egg.Furfrou.Furfrou_bool == true){
                            userData.egg.esen += 1000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Furfrou_gif}: Furfrou and you got ${gif.esen_gif}x**1,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Furfrou_gif;
                        egg_name = 'Furfrou';
                        userData.egg.Furfrou.Furfrou_bool = true;

                    }else if(rank_r == 3){
                        if(userData.egg.Bee.Bee_bool == true){
                            userData.egg.esen += 1000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Bee_gif}: Bee and you got ${gif.esen_gif}x**1,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Bee_gif;
                        egg_name = 'bee';
                        userData.egg.Bee.Bee_bool = true;

                    }else if(rank_r == 4){
                        if(userData.egg.Metapod.Metapod_bool == true){
                            userData.egg.esen += 1000;
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.Metapod_gif}: Metapod and you got ${gif.esen_gif}x**1,000**`)] });
                            await userData.save();
                            return;
                        }
                        egg = gif.Metapod_gif;
                        egg_name = 'metapod';
                        userData.egg.Metapod.Metapod_bool = true;
                    }
                }

                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> opened an ${gif.egg_gif} and you got ${egg}: ${egg_name}`)] });

                userData.levelSystem.xp += 10;

                await userData.save();
                return;
            }

            const allAniaml = ['Elekid', 'Bee', 'Rutr', 'Furfrou', 'Nicy', 'Onix', 'Fegar', 'Megagengar', 'Metapod', 'Shiny', 'Sandshrew'];
            let test = [];

            let numer = 0;
            for(const animal of allAniaml){
                const name = animal.toLowerCase();
                let Show = '';
                let Show_level = '';
                let Show_equiped = '';
                let Show_NL = '';
                let R = '';
                if(userData.egg[animal][`${animal}_bool`] == true){
                    Show = `${animal}: ${gif[`${animal}_gif`]}, LEVEL: `;
                    Show_NL = '\n';
                    R = '`';
                    if(userData.egg.equipe == `${name}`){
                        Show_equiped = ` :**Equiped**\n${animal}: ${R}[${parseInt(userData.egg[animal][`${animal}_xp`]).toLocaleString()}/${parseInt(userData.egg[animal][`${animal}_ratelevel`]).toLocaleString()}]${R}\n`;
                        Show_NL = '';
                    }
                    Show_level = `${userData.egg[animal][`${animal}_level`]}${Show_NL}`;
                    test[numer] = `${Show}${R}${Show_level}${R}${Show_equiped}`;
                }
                numer += 1;
            }
            let messageAniaml = `<@${user.id}> your eggs\n**==========EGGS==========**\n**Egg** ${gif.egg_gif} : ${sym}${userData.egg.egg_amount.toLocaleString()}${sym}, **Esen** ${gif.esen_gif} : ${sym}${userData.egg.esen.toLocaleString()}${sym}\n`;
            for(let i = 0; i < numer; i++){
                if(test[i]){
                    messageAniaml += test[i];
                }
            }
            messageAniaml += '**==========EGGS==========**';
            message.channel.send({ embeds: [SimpleEmbed(messageAniaml)] });
            return;
        }catch(error){
            console.error(`egg error ${error}`);
        }
    },
};