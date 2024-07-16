const { sym, gif, getUser, SimpleEmbed, getRandomInt, customEmbed, getAnimalIdByName, getAnimalNameByName, checkOwnAnimal, getRank, getWeaponRank, getPassive, getWeaponRankById, getWeaponEquipById, getWeaponNameById, getWeaponName, labelButton, twoButton, getCollectionButton, ButtonStyle, cooldown, threeButton, InteractionCollector } = require('../../functioon/function');
const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'w',
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

            if(args[0] == 'm' || args[0] == 'metal'){
                message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you have **${userData.shard.toLocaleString()}** ${gif.shard_gif}Weapon Metals!`)] });
                return;
            }

            if(args[0] == 'rr'){
                let weapon_id = args[1];
                if(userData.shard < 100){ return message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you don't have enough Weapon Metals!`)] }); }
                if(!weapon_id){ return message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, invalid syntax! Please use the format:${sym} w rr {weaponID} [passive|stat]!${sym}`)] }); }

                weapon_id = args[1].toUpperCase();
                    let index = 0;
                    for(const allwp of userData.wp){
                        const str = `${allwp}`;
                        const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');

                        if(weapon_id == id){
                            userData.shard -= 100;
                            let rank_ran = getRandomInt(1, 101);
                            let passive_ran = getRandomInt(1, 13);
                            let new_rank = '';
                            let new_passive = '';

                            if(rank_ran > 0 && rank_ran <= 20){
                                new_rank = 'common';
                                rank_gif = gif.animal_rank_1;
                            }else if(rank_ran >= 21 && rank_ran <= 40){
                                new_rank = 'uncommon';
                                rank_gif = gif.animal_rank_2;
                            }else if(rank_ran >= 41 && rank_ran <= 60){
                                new_rank = 'rare';
                                rank_gif = gif.animal_rank_3;
                            }else if(rank_ran >= 61 && rank_ran <= 80){
                                new_rank = 'epic';
                                rank_gif = gif.animal_rank_4;
                            }else if(rank_ran >= 81 && rank_ran <= 94){
                                const mythical_ran = getRandomInt(1, 6);
                                if(mythical_ran == 1){
                                    new_rank = 'mythical';
                                    rank_gif = gif.animal_rank_5;
                                }else{
                                    rank_ran = getRandomInt(1, 81);
                                    if(rank_ran > 0 && rank_ran <= 20){
                                        new_rank = 'common';
                                        rank_gif = gif.animal_rank_1;
                                    }else if(rank_ran >= 21 && rank_ran <= 40){
                                        new_rank = 'uncommon';
                                        rank_gif = gif.animal_rank_2;
                                    }else if(rank_ran >= 41 && rank_ran <= 60){
                                        new_rank = 'rare';
                                        rank_gif = gif.animal_rank_3;
                                    }else if(rank_ran >= 61 && rank_ran <= 80){
                                        new_rank = 'epic';
                                        rank_gif = gif.animal_rank_4;
                                    }
                                }
                            }else if(rank_ran >= 95 && rank_ran <= 99){
                                const legendary_ran = getRandomInt(1, 101);
                                if(legendary_ran == 1){
                                    new_rank = 'legendary';
                                    rank_gif = gif.animal_rank_6;
                                }else{
                                    rank_ran = getRandomInt(1, 95);
                                    if(rank_ran > 0 && rank_ran <= 20){
                                        new_rank = 'common';
                                        rank_gif = gif.animal_rank_1;
                                    }else if(rank_ran >= 21 && rank_ran <= 40){
                                        new_rank = 'uncommon';
                                        rank_gif = gif.animal_rank_2;
                                    }else if(rank_ran >= 41 && rank_ran <= 60){
                                        new_rank = 'rare';
                                        rank_gif = gif.animal_rank_3;
                                    }else if(rank_ran >= 61 && rank_ran <= 80){
                                        new_rank = 'epic';
                                        rank_gif = gif.animal_rank_4;
                                    }else if(rank_ran >= 81 && rank_ran <= 94){
                                        const mythical_ran = getRandomInt(1, 6);
                                        if(mythical_ran == 1){
                                            new_rank = 'mythical';
                                            rank_gif = gif.animal_rank_5;
                                        }else{
                                            rank_ran = getRandomInt(1, 81);
                                            if(rank_ran > 0 && rank_ran <= 20){
                                                new_rank = 'common';
                                                rank_gif = gif.animal_rank_1;
                                            }else if(rank_ran >= 21 && rank_ran <= 40){
                                                new_rank = 'uncommon';
                                                rank_gif = gif.animal_rank_2;
                                            }else if(rank_ran >= 41 && rank_ran <= 60){
                                                new_rank = 'rare';
                                                rank_gif = gif.animal_rank_3;
                                            }else if(rank_ran >= 61 && rank_ran <= 80){
                                                new_rank = 'epic';
                                                rank_gif = gif.animal_rank_4;
                                            }
                                        }
                                    }
                                }
                            }else if(rank_ran >= 100 && rank_ran <= 100){
                                const febled_ran = getRandomInt(1, 501);
                                if(febled_ran == 1){
                                    new_rank = 'febled';
                                    rank_gif = gif.animal_rank_8;
                                }else{
                                    rank_ran = getRandomInt(1, 95);
                                    if(rank_ran > 0 && rank_ran <= 20){
                                        new_rank = 'common';
                                        rank_gif = gif.animal_rank_1;
                                    }else if(rank_ran >= 21 && rank_ran <= 40){
                                        new_rank = 'uncommon';
                                        rank_gif = gif.animal_rank_2;
                                    }else if(rank_ran >= 41 && rank_ran <= 60){
                                        new_rank = 'rare';
                                        rank_gif = gif.animal_rank_3;
                                    }else if(rank_ran >= 61 && rank_ran <= 80){
                                        new_rank = 'epic';
                                        rank_gif = gif.animal_rank_4;
                                    }else if(rank_ran >= 81 && rank_ran <= 94){
                                        const mythical_ran = getRandomInt(1, 6);
                                        if(mythical_ran == 1){
                                            new_rank = 'mythical';
                                            rank_gif = gif.animal_rank_5;
                                        }else{
                                            rank_ran = getRandomInt(1, 81);
                                            if(rank_ran > 0 && rank_ran <= 20){
                                                new_rank = 'common';
                                                rank_gif = gif.animal_rank_1;
                                            }else if(rank_ran >= 21 && rank_ran <= 40){
                                                new_rank = 'uncommon';
                                                rank_gif = gif.animal_rank_2;
                                            }else if(rank_ran >= 41 && rank_ran <= 60){
                                                new_rank = 'rare';
                                                rank_gif = gif.animal_rank_3;
                                            }else if(rank_ran >= 61 && rank_ran <= 80){
                                                new_rank = 'epic';
                                                rank_gif = gif.animal_rank_4;
                                            }
                                        }
                                    }
                                }
                            }

                            if(passive_ran == 1){
                                new_passive = 'physical_Resistance_effect';
                            }else if(passive_ran == 2){
                                new_passive = 'magic_Resistance_effect';
                            }else if(passive_ran == 3){
                                new_passive = 'strength_effect';
                            }else if(passive_ran == 4){
                                new_passive = 'magic_effect';
                            }else if(passive_ran == 5){
                                new_passive = 'health_point_effect';
                            }else if(passive_ran == 6){
                                new_passive = 'weapon_point_effect';
                            }else if(passive_ran == 7){
                                new_passive = 'lifesteal_effect';
                            }else if(passive_ran == 8){
                                new_passive = 'regeneration_effect';
                            }else if(passive_ran == 9){
                                new_passive = 'sacrifice_Effect';
                            }else if(passive_ran == 10){
                                new_passive = 'thorns_Effect';
                            }else if(passive_ran == 11){
                                new_passive = 'discharge_Effect';
                            }else if(passive_ran == 12){
                                new_passive = 'sprout_Effect';
                            }

                            let weapon_gif = gif[`${name}_${rank}_gif`];
                            let weapon_gif2 = gif[`${name}_${new_rank}_gif`];
                            let passive_gif = gif[`${passive}_gif`];
                            let passive_gif2 = gif[`${new_passive}_gif`];
                            const embed = customEmbed()
                                .setAuthor({ name: `${user.displayName} spent 100 Weapon Metals to reroll!`, iconURL: user.displayAvatarURL() })
                                .setColor('Aqua')
                                .setDescription(`${weapon_gif}**[CURRENT]**  ${await getWeaponNameById(id, user.id)}\n**ID: **${sym}${id}${sym}\n**Quality: **${getRank(rank)} ${percen}%\n**Wear: **${sym}DECENT${sym}\n**WP Cost: **0 ${gif.state_wp}\n**Description: **???\n\n${passive_gif} **Current Passive**\n====================================\n${weapon_gif2}**[NEW]**  ${await getWeaponNameById(id, user.id)}\n**ID: **${sym}${id}${sym}\n**Quality: **${getRank(new_rank)} ${rank_ran}%\n**Wear: **${sym}WORN${sym}\n**WP Cost: **0 ${gif.state_wp}\n**Description: **???\n\n${passive_gif2} **New Passive**`)
                                .setFooter({ text: `REROLE || PASSIVE` });
                            const confirmButton = labelButton('confirm_button', '✅ Confirm', ButtonStyle.Success);
                            const cancelButton = labelButton('cancel_button', '❎ Cancel', ButtonStyle.Danger);
                            const rerollButton = labelButton('rerollButton', '🔄️ Reroll', ButtonStyle.Secondary);
                            const allButton = threeButton(confirmButton, cancelButton, rerollButton);

                            const mgs = await message.channel.send({ embeds: [embed], components: [allButton] });
                            const collector = getCollectionButton(mgs, 300_000);

                            collector.on('end', (collected, reason) => {
                                if (reason === 'time') {
                                    confirmButton.setDisabled(true);
                                    cancelButton.setDisabled(true);
                                    rerollButton.setDisabled(true);
                                    mgs.edit({ embeds: [embed.setColor('#3D3D3D')], components: [allButton] });
                                    return;
                                }
                            });

                            collector.on('collect', async (interaction) => {
                                try{
                                    const userData = await getUser(user.id);

                                    if(!interaction.isButton()){
                                        return;
                                    }
                                    if (interaction.member.user.id !== user.id) {
                                        await interaction.reply({ content: 'This button is not for you!', ephemeral: true });
                                        return;
                                    }
                    
                                    if (interaction.customId === 'confirm_button') {
                                        let index = 0;
                                        for(const allwp of userData.wp){
                                            const str = `${allwp}`;
                                            const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
    
                                            let passive_two_gif = '';
                                            if(passive_two){ passive_two_gif = passive_two }
    
                                            if(weapon_id == id){
                                                userData.wp.splice(index, 1);
                                                information_weapon = `${weapon_id} ${name} ${new_rank} ${new_passive} ${rank_ran} false ${passive_two_gif}`;
                                                userData.wp.push(`${information_weapon}`);
                                                break;
                                            }
                                            index += 1;
                                        }
                                        confirmButton.setDisabled(true);
                                        cancelButton.setDisabled(true);
                                        rerollButton.setDisabled(true);
                                        await interaction.update({ embeds: [embed.setColor('Green')], components: [allButton] });
                                        try{
                                            await userData.save();
                                        }catch(error){}
                                        collector.stop();
                                    }
    
                                    if (interaction.customId === 'rerollButton'){
                                        if(userData.shard < 100){ 
                                            confirmButton.setDisabled(true);
                                            cancelButton.setDisabled(true);
                                            rerollButton.setDisabled(true);
                                            collector.stop(); 
                                            return interaction.update({ embeds: [embed.setColor('Red')], components: [allButton] }); 
                                        }
                                        userData.shard -= 100;
                                        rank_ran = getRandomInt(1, 101);
                                        passive_ran = getRandomInt(1, 13);
    
                                        if(rank_ran > 0 && rank_ran <= 20){
                                            new_rank = 'common';
                                            rank_gif = gif.animal_rank_1;
                                        }else if(rank_ran >= 21 && rank_ran <= 40){
                                            new_rank = 'uncommon';
                                            rank_gif = gif.animal_rank_2;
                                        }else if(rank_ran >= 41 && rank_ran <= 60){
                                            new_rank = 'rare';
                                            rank_gif = gif.animal_rank_3;
                                        }else if(rank_ran >= 61 && rank_ran <= 80){
                                            new_rank = 'epic';
                                            rank_gif = gif.animal_rank_4;
                                        }else if(rank_ran >= 81 && rank_ran <= 94){
                                            const mythical_ran = getRandomInt(1, 6);
                                            if(mythical_ran == 1){
                                                new_rank = 'mythical';
                                                rank_gif = gif.animal_rank_5;
                                            }else{
                                                rank_ran = getRandomInt(1, 81);
                                                if(rank_ran > 0 && rank_ran <= 20){
                                                    new_rank = 'common';
                                                    rank_gif = gif.animal_rank_1;
                                                }else if(rank_ran >= 21 && rank_ran <= 40){
                                                    new_rank = 'uncommon';
                                                    rank_gif = gif.animal_rank_2;
                                                }else if(rank_ran >= 41 && rank_ran <= 60){
                                                    new_rank = 'rare';
                                                    rank_gif = gif.animal_rank_3;
                                                }else if(rank_ran >= 61 && rank_ran <= 80){
                                                    new_rank = 'epic';
                                                    rank_gif = gif.animal_rank_4;
                                                }
                                            }
                                        }else if(rank_ran >= 95 && rank_ran <= 99){
                                            const legendary_ran = getRandomInt(1, 101);
                                            if(legendary_ran == 1){
                                                new_rank = 'legendary';
                                                rank_gif = gif.animal_rank_6;
                                            }else{
                                                rank_ran = getRandomInt(1, 95);
                                                if(rank_ran > 0 && rank_ran <= 20){
                                                    new_rank = 'common';
                                                    rank_gif = gif.animal_rank_1;
                                                }else if(rank_ran >= 21 && rank_ran <= 40){
                                                    new_rank = 'uncommon';
                                                    rank_gif = gif.animal_rank_2;
                                                }else if(rank_ran >= 41 && rank_ran <= 60){
                                                    new_rank = 'rare';
                                                    rank_gif = gif.animal_rank_3;
                                                }else if(rank_ran >= 61 && rank_ran <= 80){
                                                    new_rank = 'epic';
                                                    rank_gif = gif.animal_rank_4;
                                                }else if(rank_ran >= 81 && rank_ran <= 94){
                                                    const mythical_ran = getRandomInt(1, 6);
                                                    if(mythical_ran == 1){
                                                        new_rank = 'mythical';
                                                        rank_gif = gif.animal_rank_5;
                                                    }else{
                                                        rank_ran = getRandomInt(1, 81);
                                                        if(rank_ran > 0 && rank_ran <= 20){
                                                            new_rank = 'common';
                                                            rank_gif = gif.animal_rank_1;
                                                        }else if(rank_ran >= 21 && rank_ran <= 40){
                                                            new_rank = 'uncommon';
                                                            rank_gif = gif.animal_rank_2;
                                                        }else if(rank_ran >= 41 && rank_ran <= 60){
                                                            new_rank = 'rare';
                                                            rank_gif = gif.animal_rank_3;
                                                        }else if(rank_ran >= 61 && rank_ran <= 80){
                                                            new_rank = 'epic';
                                                            rank_gif = gif.animal_rank_4;
                                                        }
                                                    }
                                                }
                                            }
                                        }else if(rank_ran >= 100 && rank_ran <= 100){
                                            const febled_ran = getRandomInt(1, 501);
                                            if(febled_ran == 1){
                                                new_rank = 'febled';
                                                rank_gif = gif.animal_rank_8;
                                            }else{
                                                rank_ran = getRandomInt(1, 95);
                                                if(rank_ran > 0 && rank_ran <= 20){
                                                    new_rank = 'common';
                                                    rank_gif = gif.animal_rank_1;
                                                }else if(rank_ran >= 21 && rank_ran <= 40){
                                                    new_rank = 'uncommon';
                                                    rank_gif = gif.animal_rank_2;
                                                }else if(rank_ran >= 41 && rank_ran <= 60){
                                                    new_rank = 'rare';
                                                    rank_gif = gif.animal_rank_3;
                                                }else if(rank_ran >= 61 && rank_ran <= 80){
                                                    new_rank = 'epic';
                                                    rank_gif = gif.animal_rank_4;
                                                }else if(rank_ran >= 81 && rank_ran <= 94){
                                                    const mythical_ran = getRandomInt(1, 6);
                                                    if(mythical_ran == 1){
                                                        new_rank = 'mythical';
                                                        rank_gif = gif.animal_rank_5;
                                                    }else{
                                                        rank_ran = getRandomInt(1, 81);
                                                        if(rank_ran > 0 && rank_ran <= 20){
                                                            new_rank = 'common';
                                                            rank_gif = gif.animal_rank_1;
                                                        }else if(rank_ran >= 21 && rank_ran <= 40){
                                                            new_rank = 'uncommon';
                                                            rank_gif = gif.animal_rank_2;
                                                        }else if(rank_ran >= 41 && rank_ran <= 60){
                                                            new_rank = 'rare';
                                                            rank_gif = gif.animal_rank_3;
                                                        }else if(rank_ran >= 61 && rank_ran <= 80){
                                                            new_rank = 'epic';
                                                            rank_gif = gif.animal_rank_4;
                                                        }
                                                    }
                                                }
                                            }
                                        }
            
                                        if(passive_ran == 1){
                                            new_passive = 'physical_Resistance_effect';
                                        }else if(passive_ran == 2){
                                            new_passive = 'magic_Resistance_effect';
                                        }else if(passive_ran == 3){
                                            new_passive = 'strength_effect';
                                        }else if(passive_ran == 4){
                                            new_passive = 'magic_effect';
                                        }else if(passive_ran == 5){
                                            new_passive = 'health_point_effect';
                                        }else if(passive_ran == 6){
                                            new_passive = 'weapon_point_effect';
                                        }else if(passive_ran == 7){
                                            new_passive = 'lifesteal_effect';
                                        }else if(passive_ran == 8){
                                            new_passive = 'regeneration_effect';
                                        }else if(passive_ran == 9){
                                            new_passive = 'sacrifice_Effect';
                                        }else if(passive_ran == 10){
                                            new_passive = 'thorns_Effect';
                                        }else if(passive_ran == 11){
                                            new_passive = 'discharge_Effect';
                                        }else if(passive_ran == 12){
                                            new_passive = 'sprout_Effect';
                                        }
    
                                        weapon_gif2 = gif[`${name}_${new_rank}_gif`];
                                        passive_gif2 = gif[`${new_passive}_gif`];
    
                                        await interaction.update({ embeds: [embed.setColor('Aqua').setDescription(`${weapon_gif}**[CURRENT]**  ${await getWeaponNameById(id, user.id)}\n**ID: **${sym}${id}${sym}\n**Quality: **${getRank(rank)} ${percen}%\n**Wear: **${sym}DECENT${sym}\n**WP Cost: **0 ${gif.state_wp}\n**Description: **???\n\n${passive_gif} **Current Passive**\n====================================\n${weapon_gif2}**[NEW]**  ${await getWeaponNameById(id, user.id)}\n**ID: **${sym}${id}${sym}\n**Quality: **${getRank(new_rank)} ${rank_ran}%\n**Wear: **${sym}WORN${sym}\n**WP Cost: **0 ${gif.state_wp}\n**Description: **???\n\n${passive_gif2} **New Passive**`)], components: [allButton] });
                                        try{
                                            await userData.save();
                                        }catch(error){}
                                    }
                    
                                    if (interaction.customId === 'cancel_button') {
                                        await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> has canceled Reroll`)], components: [] });
                                        try{
                                            await userData.save();
                                        }catch(error){}
                                        collector.stop();
                                    }
                                }catch(error){}
                            });

                            return;
                        }
                        index += 1;
                    }
                return;
            }
    
            if(args[0]){
                if(args[0] == 'unequip'){
                    const weapon_id = args[1].toUpperCase();
                    if(!await getWeaponEquipById(weapon_id, user.id)){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, this weapon is not equipped on anyone!`)] }); return; };
                    let index = 0;
                    for(const allwp of userData.wp){
                        const str = `${allwp}`;
                        const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');

                        if(weapon_id == id){
                            message.channel.send(`**🗡️ | ${user.displayName}**, Unequipped ${await getWeaponRankById(weapon_id, user.id)} ${await getWeaponNameById(weapon_id, user.id)} from ${gif[`rank_${getAnimalIdByName(boolStr)}`]} ${boolStr}!`);
                            const string = str.replace(`${boolStr}`, 'false');
                            userData.wp[index] = string;
                            try{
                                await userData.save();
                            }catch(error){}
                            return;
                        }
                        index += 1;
                    }
    
                    return;
                }
    
                const weapon_id = args[0].toUpperCase();
                if(weapon_id){
                    let index = 0;
                    let animal_name = args[1];

                    if(userData.sat.team.team_set == 1){
                        if(['1','2','3'].includes(animal_name)){
                            if(animal_name == 1){
                                if(!userData.sat.team.postion1){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, Create a team first!`)] }); return; }
                                animal_name = `${userData.sat.team.postion1}`;
                            }else if(animal_name == 2){
                                if(!userData.sat.team.postion2){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, Create a team first!`)] }); return; }
                                animal_name = `${userData.sat.team.postion2}`;
                            }else if(animal_name == 3){
                                if(!userData.sat.team.postion3){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, Create a team first!`)] }); return; }
                                animal_name = `${userData.sat.team.postion3}`;
                            }
                        }
                    }else if(userData.sat.team.team_set == 2){
                        if(['1','2','3'].includes(animal_name)){
                            if(animal_name == 1){
                                if(!userData.sat.team.postion4){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, Create a team first!`)] }); return; }
                                animal_name = `${userData.sat.team.postion4}`;
                            }else if(animal_name == 2){
                                if(!userData.sat.team.postion5){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, Create a team first!`)] }); return; }
                                animal_name = `${userData.sat.team.postion5}`;
                            }else if(animal_name == 3){
                                if(!userData.sat.team.postion6){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, Create a team first!`)] }); return; }
                                animal_name = `${userData.sat.team.postion6}`;
                            }
                        }
                    }

                    for(const wp of userData.wp){
                        const str = `${wp}`;
                        const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');

                        if(boolStr == animal_name){
                            const string = str.replace(`${boolStr}`, `false`);
                            userData.wp[index] = string;
                        }

                        if(str.includes(`${weapon_id}`)){
                            if(!getAnimalNameByName(animal_name)){ if(!await checkOwnAnimal(animal_name, user.id)){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>** you do not own this animal!`)] }); return; } }
    
                            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, ${gif[`rank_${getAnimalIdByName(animal_name)}`]} **${animal_name}** is now equiped ${await getWeaponRankById(weapon_id, user.id)} ${await getWeaponNameById(weapon_id, user.id)}!`)] });
                            const string = str.replace(`${boolStr}`, `${animal_name}`);
                            userData.wp[index] = string;
                        }
                        index += 1;
                    }
                    try{
                        await userData.save();
                    }catch(error){}
                    return;
                }
            }
            
            let Page = 1;
            if(userData.wp.length < 1){
                const embed = customEmbed()
                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\nNothing`)
                    .setColor('#8EC3FF')
                    .setFooter({ text: `Page 1/1` })
                message.channel.send({ embeds: [embed] }); 
            }else{
                var messageWeapons = [];
                let index = 0;
                let messageWeapon = ''; 
                for (const wp of userData.wp) {
                    const str = `${wp}`;
                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');

                    let passive_two_gif = '';
                    if(passive_two){ passive_two_gif = getPassive(passive_two) }

                    let equiped = '';
                    if (boolStr != 'false') {
                        if(getAnimalNameByName(boolStr)){
                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                        }
                    }

                    messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                    index += 1;

                    if (index === 15) {
                        messageWeapons[Page-1] = `${messageWeapon}`;
                        Page += 1;
                        index = 0;
                        messageWeapon = '';
                    }
                }

                if (messageWeapon !== '') {
                    messageWeapons.push(messageWeapon);
                }

                if(Page > 1){
                    let name_choice = 'All';
                    let setAmount = new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setCustomId('set_amount_psa')
                            .setPlaceholder(`${name_choice}`)
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions([
                                {
                                    label: `All`,
                                    description: `View only`,
                                    value: `all`
                                },
                                {
                                    label: `Great Sword`,
                                    description: `View only`,
                                    value: `Great_Sword`
                                },
                                {
                                    label: `Healing Staff`,
                                    description: `View only`,
                                    value: `Healing_Staff`
                                },
                                {
                                    label: `Bow`,
                                    description: `View only`,
                                    value: `Bow`
                                },
                                {
                                    label: `Rune of the Forgotten`,
                                    description: `View only`,
                                    value: `Rune_of_the_Forgotten`
                                },
                                {
                                    label: `Defenders Aegis`,
                                    description: `View only`,
                                    value: `Defenders_Aegis`
                                },
                                {
                                    label: `Orb of Potency`,
                                    description: `View only`,
                                    value: `Orb_of_Potency`
                                },
                                {
                                    label: `Poison Dagger`,
                                    description: `View only`,
                                    value: `Poison_Dagger`
                                },
                                {
                                    label: `Wand of Absorption`,
                                    description: `View only`,
                                    value: `Wand_of_Absorption`
                                },
                                {
                                    label: `Spirit Staff`,
                                    description: `View only`,
                                    value: `Spirit_Staff`
                                },
                                {
                                    label: `Energy Staff`,
                                    description: `View only`,
                                    value: `Energy_Staff`
                                },
                                {
                                    label: `Resurrection Staff`,
                                    description: `View only`,
                                    value: `Resurrection_Staff`
                                },
                                {
                                    label: `Culling Scythe`,
                                    description: `View only`,
                                    value: `Culling_Scythe`
                                },
                                {
                                    label: `Crune of Celebration`,
                                    description: `View only`,
                                    value: `Crune_of_Celebration`
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
                        case 'all':
                            try{
                                name_choice = 'All';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                index = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;
                
                                    index += 1;
                
                                    if (index === 15) {
                                        messageWeapons[Page-1] = `${messageWeapon}`;
                                        Page += 1;
                                        index = 0;
                                        messageWeapon = '';
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Great_Sword':
                            try{
                                name_choice = 'Great Sword';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'great_sword'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Healing_Staff':
                            try{
                                name_choice = 'Healing Staff';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'healing_stuff'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Bow':
                            try{
                                name_choice = 'Bow';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'bow'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Rune_of_the_Forgotten':
                            try{
                                name_choice = 'Rune of the Forgotten';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'rune_of_the_forgotten'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Defenders_Aegis':
                            try{
                                name_choice = 'Defenders Aegis';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'defender_aegis'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Orb_of_Potency':
                            try{
                                name_choice = 'Orb of Potency';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'orb_of_potency'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Poison_Dagger':
                            try{
                                name_choice = 'Poison Dagger';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'poison_dagger'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Wand_of_Absorption':
                            try{
                                name_choice = 'Wand_of_Absorption';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'wang_of_absorption'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Spirit_Staff':
                            try{
                                name_choice = 'Spirit Staff';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'spirit_stuff'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Energy_Staff':
                            try{
                                name_choice = 'Energy Staff';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'energy_stuff'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Resurrection_Staff':
                            try{
                                name_choice = 'Resurrection Staff';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'resurrection_staff'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Culling_Scythe':
                            try{
                                name_choice = 'Culling Scythe';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'culling_scythe'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
                            break;
                        case 'Crune_of_Celebration':
                            try{
                                name_choice = 'Crune of Celebration';
                                messageWeapons = [];
                                messageWeapon = '';

                                left_page.setDisabled(true);
                                view_page = 1;
                                Page = 1;

                                let next_page = 0;

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(name == 'crune_of_celebration'){
                                        messageWeapon += `${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`;

                                        next_page += 1;
                                        if(next_page > 15){ next_page = 0; Page += 1; }
                                        if(next_page === 15){
                                            messageWeapons[Page-1] = `${messageWeapon}`;
                                            messageWeapon = '';
                                        }
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                } else {
                                    messageWeapons.push('Nothing');
                                }

                                if(Page < 2){ right_page.setDisabled(true); }else{ right_page.setDisabled(false); }

                                setAmount = new ActionRowBuilder()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId('set_amount_psa')
                                        .setPlaceholder(`${name_choice}`)
                                        .setMinValues(1)
                                        .setMaxValues(1)
                                        .addOptions([
                                            {
                                                label: `All`,
                                                description: `View only`,
                                                value: `all`
                                            },
                                            {
                                                label: `Great Sword`,
                                                description: `View only`,
                                                value: `Great_Sword`
                                            },
                                            {
                                                label: `Healing Staff`,
                                                description: `View only`,
                                                value: `Healing_Staff`
                                            },
                                            {
                                                label: `Bow`,
                                                description: `View only`,
                                                value: `Bow`
                                            },
                                            {
                                                label: `Rune of the Forgotten`,
                                                description: `View only`,
                                                value: `Rune_of_the_Forgotten`
                                            },
                                            {
                                                label: `Defenders Aegis`,
                                                description: `View only`,
                                                value: `Defenders_Aegis`
                                            },
                                            {
                                                label: `Orb of Potency`,
                                                description: `View only`,
                                                value: `Orb_of_Potency`
                                            },
                                            {
                                                label: `Poison Dagger`,
                                                description: `View only`,
                                                value: `Poison_Dagger`
                                            },
                                            {
                                                label: `Wand of Absorption`,
                                                description: `View only`,
                                                value: `Wand_of_Absorption`
                                            },
                                            {
                                                label: `Spirit Staff`,
                                                description: `View only`,
                                                value: `Spirit_Staff`
                                            },
                                            {
                                                label: `Energy Staff`,
                                                description: `View only`,
                                                value: `Energy_Staff`
                                            },
                                            {
                                                label: `Resurrection Staff`,
                                                description: `View only`,
                                                value: `Resurrection_Staff`
                                            },
                                            {
                                                label: `Culling Scythe`,
                                                description: `View only`,
                                                value: `Culling_Scythe`
                                            },
                                            {
                                                label: `Crune of Celebration`,
                                                description: `View only`,
                                                value: `Crune_of_Celebration`
                                            },
                                        ])
                                    );

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }catch(error){}
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
                time: 300_000
            });
            interc.on('end', () => {
                client.removeListener('interactionCreate', interactionHandler);
            });

                    let view_page = 1;
                    const embed = customEmbed()
                        .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                        .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\nSell: ${sym}sell {weaponID}${sym}\n\n${messageWeapons[0]}`)
                        .setColor('#8EC3FF')
                        .setFooter({ text: `Page ${view_page}/${Page}` })

                    const left_page = labelButton('left_page', '<', ButtonStyle.Success);
                    const right_page = labelButton('right_page', '>', ButtonStyle.Success);
                    const short_button = labelButton('short_button', 's', ButtonStyle.Primary);

                    const all_button = threeButton(left_page, right_page, short_button);

                    if(view_page == 1){ left_page.setDisabled(true); }

                    const mgs = await message.channel.send({ embeds: [embed], components: [setAmount, all_button] }); 

                    const collector = getCollectionButton(mgs, 300_000);

                    collector.on('end', () =>{
                        try{
                            collector.stop();
                            const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('Blurple')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                            mgs.edit({ embeds: [embed], components: [] });
                            return; 
                        }catch(error){}
                    })

                    collector.on('collect', async (interaction) =>{
                        try{
                            if (interaction.member.user.id != user.id){
                                await interaction.reply({ content: 'Not your button!', ephemeral: true });
                                return;
                            }
    
                            if(interaction.customId == 'right_page'){
                                if(view_page == Page-1){ right_page.setDisabled(true); }
                                left_page.setDisabled(false);
                                view_page += 1;
                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }
                            if(interaction.customId == 'left_page'){
                                if(view_page == 2){ left_page.setDisabled(true); }
                                right_page.setDisabled(false);
                                view_page -= 1;
                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            } 
                            if(interaction.customId == 'short_button'){
                                messageWeapons.shift();
                                messageWeapon = '';

                                left_page.setDisabled(true);

                                view_page = 1;
                                Page = 1;

                                let amount_weapon_all = 0;
                                let weapon_f = [];
                                let weapon_l = [];
                                let weapon_m = [];
                                let weapon_e = [];
                                let weapon_r = [];
                                let weapon_u = [];
                                let weapon_c = [];

                                for (const wp of userData.wp) {
                                    const str = `${wp}`;
                                    const [id, name, rank, passive, percen, boolStr, passive_two] = str.split(' ');
                
                                    let passive_two_gif = '';
                                    if(passive_two){ passive_two_gif = getPassive(passive_two) }
                
                                    let equiped = '';
                                    if (boolStr != 'false') {
                                        if(getAnimalNameByName(boolStr)){
                                            equiped = `➤ ${gif[`rank_${getAnimalIdByName(boolStr)}`]}`;
                                        }
                                    }
                
                                    if(rank == 'common'){
                                        weapon_c.push(`${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`);
                                    }else if(rank == 'uncommon'){
                                        weapon_u.push(`${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`);
                                    }else if(rank == 'rare'){
                                        weapon_r.push(`${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`);
                                    }else if(rank == 'epic'){
                                        weapon_e.push(`${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`);
                                    }else if(rank == 'mythical'){
                                        weapon_m.push(`${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`);
                                    }else if(rank == 'legendary'){
                                        weapon_l.push(`${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`);
                                    }else if(rank == 'febled'){
                                        weapon_f.push(`${sym}${id}${sym} ${getRank(rank)} ${getWeaponRank(name, rank)} ${getPassive(passive)}${passive_two_gif} ${getWeaponName(name)} ${percen}% ${equiped}\n`);
                                    }
                                }

                                let next_page = 0;
                                let increase = 0;

                                let amount_weapon_f = weapon_f.length;
                                let amount_weapon_l = weapon_l.length;
                                let amount_weapon_m = weapon_m.length;
                                let amount_weapon_e = weapon_e.length;
                                let amount_weapon_r = weapon_r.length;
                                let amount_weapon_u = weapon_u.length;
                                let amount_weapon_c = weapon_c.length;

                                amount_weapon_all = (amount_weapon_f + amount_weapon_l + amount_weapon_m + amount_weapon_e + amount_weapon_r + amount_weapon_u + amount_weapon_c);

                                for(let i = 1; i <= amount_weapon_all; i++){

                                    if(amount_weapon_f > 0){
                                        messageWeapon += weapon_f[increase];
                                        amount_weapon_f -= 1;
                                        increase += 1;
                                        if(amount_weapon_f <= 0){ increase = 0; }

                                    }else if(amount_weapon_l > 0){
                                        messageWeapon += weapon_l[increase];
                                        amount_weapon_l -= 1;
                                        increase += 1;
                                        if(amount_weapon_l <= 0){ increase = 0; }

                                    }else if(amount_weapon_m > 0){
                                        messageWeapon += weapon_m[increase];
                                        amount_weapon_m -= 1;
                                        increase += 1;
                                        if(amount_weapon_m <= 0){ increase = 0; }

                                    }else if(amount_weapon_e > 0){
                                        messageWeapon += weapon_e[increase];
                                        amount_weapon_e -= 1;
                                        increase += 1;
                                        if(amount_weapon_e <= 0){ increase = 0; }

                                    }else if(amount_weapon_r > 0){
                                        messageWeapon += weapon_r[increase];
                                        amount_weapon_r -= 1;
                                        increase += 1;
                                        if(amount_weapon_r <= 0){ increase = 0; }

                                    }else if(amount_weapon_u > 0){
                                        messageWeapon += weapon_u[increase];
                                        amount_weapon_u -= 1;
                                        increase += 1;
                                        if(amount_weapon_u <= 0){ increase = 0; }

                                    }else if(amount_weapon_c > 0){
                                        messageWeapon += weapon_c[increase];
                                        amount_weapon_c -= 1;
                                        increase += 1;
                                        if(amount_weapon_c <= 0){ increase = 0; }
                                    }
                            
                                    next_page += 1;
                                    if(next_page === 15){
                                        messageWeapons[Page-1] = `${messageWeapon}`;
                                        next_page = 0;
                                        Page += 1;
                                        messageWeapon = '';
                                    }
                                }
                
                                if (messageWeapon !== '') {
                                    messageWeapons.push(messageWeapon);
                                }

                                if(Page > 1){ right_page.setDisabled(false); }

                                const embed = customEmbed()
                                    .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                                    .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${eval(`messageWeapons[${view_page-1}]`)}`)
                                    .setColor('#8EC3FF')
                                    .setFooter({ text: `Page ${view_page}/${Page}` })
                                await interaction.update({ embeds: [embed], components: [setAmount, all_button] });
                            }
                        }catch(error){}
                    });

                }else{
                    const embed = customEmbed()
                        .setAuthor({ name: `${user.displayName}`,iconURL: user.displayAvatarURL() })
                        .setDescription(`These weapons belong to <@${user.id}>\nEquip:${sym}weapon {weaponID} {animal}${sym}\nUnequip:${sym}weapon unequip {weaponID}${sym}\n\n${messageWeapons[0]}`)
                        .setColor('#8EC3FF')
                        .setFooter({ text: `Page 1/1` })
                    message.channel.send({ embeds: [embed] }); 
                }
            }
        
        }catch(error){
            console.error(`Error in 'w' command: ${error}`);
        }
    },
};
