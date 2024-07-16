const { SimpleEmbed, getUser, cooldown, gif, sym } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'hold',
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

            if(userData.holder_item.holder_item_bool){
                let item = args[0];

                if(item){
                    let index = message.content.indexOf('hold') + 'hold'.length;
                    let item = message.content.slice(index).trim().toLowerCase();
                    if(item == 'unhold'){
                        if(userData.holder_item.holder_item_equipe == ''){
                            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} didn't holding any item!`)] });
                            return;
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} has Unequipe an item!`)] });
                        userData.holder_item.holder_item_equipe = '';
                        await userData.save();
                        return;
                    }
                    if(item.toLowerCase() == userData.holder_item.holder_item_equipe.toLowerCase()){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> that item has been equiped!`)] });
                        await userData.save();
                        return;
                    }

                    if(!['immortal','life steal','demage','defend', 'critical', 'mana'].includes(item)){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} can hold item immortal, critical, life steal, demage, defend!`)] });
                        await userData.save();
                        return;
                    }

                    if(item == 'mana'){
                        if(userData.weapon.mana_weapon == false){
                            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> don't have ${gif.mana_item_gif}!`)] });
                            return;
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} new hold ${gif.mana_item_gif}!`)] });
                        userData.holder_item.holder_item_equipe = 'mana';
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
                    if(item == 'immortal'){
                        if(userData.weapon.immortal_weapon == false){
                            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> don't have ${gif.immortal_item_gif}!`)] });
                            return;
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} new hold ${gif.immortal_item_gif}!`)] });
                        userData.holder_item.holder_item_equipe = 'immortal';
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
                    if(item == 'life steal'){
                        if(userData.weapon.life_steal_weapon == false){
                            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> don't have ${gif.life_steal_item_gif}!`)] });
                            return;
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} new hold ${gif.life_steal_item_gif}!`)] });
                        userData.holder_item.holder_item_equipe = 'life steal';
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
                    if(item == 'demage'){
                        if(userData.weapon.demage_weapon == false){
                            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> don't have ${gif.demage_item_gif}!`)] });
                            return;
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} new hold ${gif.demage_item_gif}!`)] });
                        userData.holder_item.holder_item_equipe = 'demage';
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
                    if(item == 'defend'){
                        if(userData.weapon.defend_weapon == false){
                            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> don't have ${gif.defend_item_gif}!`)] });
                            return;
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} new hold ${gif.defend_item_gif}!`)] });
                        userData.holder_item.holder_item_equipe = 'defend';
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
                    if(item == 'critical'){
                        if(userData.weapon.critical_weapon == false){
                            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> don't have ${gif.critical_item_gif}!`)] });
                            return;
                        }
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} new hold ${gif.critical_item_gif}!`)] });
                        userData.holder_item.holder_item_equipe = 'critical';
                        try{ await userData.save(); }catch(error){}
                        return;
                    }
                }

                if(userData.holder_item.holder_item_bool == false){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> you don't have ${gif.holder_item_gif}!`)] });
                    return;
                }

                if(userData.holder_item.holder_item_equipe == ''){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ${gif.holder_item_gif} didn't hold anything!`)] });
                    return;
                }

                const holding = userData.holder_item.holder_item_equipe;
                if(holding == 'immortal'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your ${gif.holder_item_gif} holding ${gif.immortal_item_gif}!`)] });
                    try{ await userData.save(); }catch(error){}
                    return;
                }else if(holding == 'critical'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your ${gif.holder_item_gif} holding ${gif.critical_item_gif}!`)] });
                    try{ await userData.save(); }catch(error){}
                    return;
                }else if(holding == 'life steal'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your ${gif.holder_item_gif} holding ${gif.life_steal_item_gif}!`)] });
                    try{ await userData.save(); }catch(error){}
                    return;
                }else if(holding == 'demage'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your ${gif.holder_item_gif} holding ${gif.demage_item_gif}!`)] });
                    try{ await userData.save(); }catch(error){}
                    return;
                }else if(holding == 'defend'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your ${gif.holder_item_gif} holding ${gif.defend_item_gif}!`)] });
                    try{ await userData.save(); }catch(error){}
                    return;
                }else if(holding == 'mana'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your ${gif.holder_item_gif} holding ${gif.mana_item_gif}!`)] });
                    try{ await userData.save(); }catch(error){}
                    return;
                }

                try{ await userData.save(); }catch(error){}
                return;
                }

        }catch(error){
            console.log(`holder item error ${error}`);
        }
    },
};