const { SimpleEmbed, getUser, gif, cooldown, sym } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'item',
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

            let choice = args[0];
            if(choice){
                if(choice == 'equipe'){
                    let index = message.content.indexOf('equipe') + 'equipe'.length;
                    const item = message.content.slice(index).trim().toLowerCase();
                    if(!item || !['immortal', 'critical', 'demage', 'defend', 'life steal' , 'mana'].includes(item)){
                        message.reply({ embeds: [SimpleEmbed(`Enter item name! immortal, critical, demage`)] });
                        return;
                    }
        
                    if(userData.holder_item.holder_item_bool == true){
                        if(userData.holder_item.holder_item_equipe == item){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you already equiped that item with your holder ${gif.holder_item_gif}`)] });
                            return;
                        }
                    }
        
                    if(item == 'mana'){
                        if(userData.weapon.mana_weapon == false){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you don't have ${gif.mana_item_gif}!`)] });
                            return;
                        }
                        if(item == userData.weapon.weapon_equipe){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you already equiped ${gif.mana_item_gif}!`)] });
                            return;
                        }
        
                        userData.weapon.weapon_equipe = item;
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your new equipe ${gif.mana_item_gif} **${userData.weapon.weapon_equipe}**!`)] });
                        try{ await userData.save(); }catch(error){}
                        return;
                    }

                    if(item == 'immortal'){
                        if(userData.weapon.immortal_weapon == false){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you don't have ${gif.immortal_item_gif}!`)] });
                            return;
                        }
                        if(item == userData.weapon.weapon_equipe){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you already equiped ${gif.immortal_item_gif}!`)] });
                            return;
                        }
        
                        userData.weapon.weapon_equipe = item;
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your new equipe ${gif.immortal_item_gif} **${userData.weapon.weapon_equipe}**!`)] });
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
        
                    if(item == 'critical'){
                        if(userData.weapon.critical_weapon == false){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you don't have ${gif.critical_item_gif}!`)] });
                            return;
                        }
                        if(item == userData.weapon.weapon_equipe){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you already equiped ${gif.critical_item_gif}!`)] });
                            return;
                        }
        
                        userData.weapon.weapon_equipe = item;
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your new equipe ${gif.critical_item_gif} **${userData.weapon.weapon_equipe}**!`)] });
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
        
                    if(item == 'life steal'){
                        if(userData.weapon.life_steal_weapon == false){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you don't have ${gif.life_steal_item_gif}!`)] });
                            return;
                        }
                        if(item == userData.weapon.weapon_equipe){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you already equiped ${gif.life_steal_item_gif}!`)] });
                            return;
                        }
        
                        userData.weapon.weapon_equipe = item;
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your new equipe ${gif.life_steal_item_gif} **${userData.weapon.weapon_equipe}**!`)] });
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
        
                    if(item == 'demage'){
                        if(userData.weapon.demage_weapon == false){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you don't have ${gif.demage_item_gif}!`)] });
                            return;
                        }
                        if(item == userData.weapon.weapon_equipe){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you already equiped ${gif.demage_item_gif}!`)] });
                            return;
                        }
        
                        userData.weapon.weapon_equipe = item;
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your new equipe ${gif.demage_item_gif} **${userData.weapon.weapon_equipe}**!`)] });
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
        
                    if(item == 'defend'){
                        if(userData.weapon.defend_weapon == false){
                            message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you don't have ${gif.defend_item_gif}!`)] });
                            return;
                        }
                        if(item == userData.weapon.weapon_equipe){
                            message.reply({ embeds: [SimpleEmbed(`*<@${user.id}> you already equiped ${gif.defend_item_gif}!`)] });
                            return;
                        }
        
                        userData.weapon.weapon_equipe = item;
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your new equipe ${gif.defend_item_gif} **${userData.weapon.weapon_equipe}**!`)] });
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
        
                    await userData.save();
                    return;
                }else if(choice == 'unequipe'){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> has Unequipe item!`)] });
                    userData.weapon.weapon_equipe = '';
                    await userData.save();
                    return;
                    
                }
            }

            let mana = '';
            let immortal = '';
            let critical = '';
            let demage = '';
            let life_steal = '';
            let defend = '';

            let mana_equipe = '';
            let immortal_equipe = '';
            let critical_equipe = '';
            let demage_equipe = '';
            let life_steal_equipe = '';
            let defend_equipe = '';

            const holding = userData.holder_item.holder_item_equipe;

            if(userData.weapon.mana_weapon == true){
                if(userData.weapon.weapon_equipe == 'mana' || holding == 'mana'){
                    mana_equipe = ' **Equiped**';
                }
                mana = `**Mana**: ${gif.mana_item_gif}${mana_equipe}\n`;
            }
            if(userData.weapon.immortal_weapon == true){
                if(userData.weapon.weapon_equipe == 'immortal' || holding == 'immortal'){
                    immortal_equipe = ' **Equiped**';
                }
                immortal = `**Immortal**: ${gif.immortal_item_gif}${immortal_equipe}\n`;
            }
            if(userData.weapon.critical_weapon == true){
                if(userData.weapon.weapon_equipe == 'critical' || holding == 'critical'){
                    critical_equipe = ' **Equiped**';
                }
                critical = `**Critical**: ${gif.critical_item_gif}${critical_equipe}\n`;
            }
            if(userData.weapon.life_steal_weapon == true){
                if(userData.weapon.weapon_equipe == 'life steal'  || holding == 'life steal'){
                    life_steal_equipe = ' **Equiped**';
                }
                life_steal = `**Life steal**: ${gif.life_steal_item_gif}${life_steal_equipe}\n`;
            }
            if(userData.weapon.demage_weapon == true){
                if(userData.weapon.weapon_equipe == 'demage' || holding == 'demage'){
                    demage_equipe = ' **Equiped**';
                }
                demage = `**Demage**: ${gif.demage_item_gif}${demage_equipe}\n`;
            }
            if(userData.weapon.defend_weapon == true){
                if(userData.weapon.weapon_equipe == 'defend' || holding == 'defend'){
                    defend_equipe = ' **Equiped**';
                }
                defend = `**Defend**: ${gif.defend_item_gif}${defend_equipe}\n`;
            }

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your item\n**=====ITEMS=====**\n${mana}${immortal}${critical}${life_steal}${demage}${defend}**================**`)] });

            await userData.save();
            return;
        }catch(error){
            console.log(`item error ${error}`);
        }
    },
};