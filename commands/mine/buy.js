const { SimpleEmbed, getUser, gif, sleep, getRandomInt, sym, cooldown, toSuperscript } = require('../../functioon/function');
const moment = require('moment-timezone');
const asiaTimezone = 'Asia/Phnom_Penh';

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'buy',
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

            const buyid = parseInt(args[0]);

            if(isNaN(buyid)){
                message.reply({ embeds: [SimpleEmbed(`<@${user.id}> enter ID to buy!!!`)] });
                await userData.save();
                return;
            }

            const saveUserBalance = userData.balance;

            if(userData.balance = 0){
                message.reply({ embeds: [SimpleEmbed(`<@${user.id}>** You don't have enough cash!**`)] });
                await userData.save();
                return;
            }

            if(buyid == 1){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }

                const pickage_price = 100000;

                if(!userData.inventory.pickage == false){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> you already bought that (${gif.pickage_gif})`)] });
                    await userData.save();
                    return;
                }

                if(userData.balance < pickage_price){

                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}>** You don't have enough cash!**`)] });

                    await userData.save();
                    return;
                }

                userData.balance -= pickage_price;
                
                userData.inventory.pickage = true;
                userData.inventory.pickage_percen = 100;

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif.pickage_gif}) and spend: ${gif.cash} **${pickage_price.toLocaleString()}**$`)] });
                await userData.save();
                return;
            }

            let amount_item = parseInt(args[1]);
            if(buyid == 2){
                if(isNaN(amount_item)){
                    amount_item = 1;
                }
                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }

                const box_price = 50000;

                const pay = box_price * amount_item;
                if(userData.balance < pay){

                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}>** You don't have enough cash!**`)] });

                    await userData.save();
                    return;
                }

                userData.balance -= pay;
                userData.inventory.box += amount_item;

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif.box_gif})x**${amount_item.toLocaleString()}** and spend: ${gif.cash} **${pay.toLocaleString()}**$`)] });

                await userData.save();
                return;
            }

            if(buyid == 3){
                if(isNaN(amount_item)){
                    amount_item = 1;
                }
                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }

                const egg_price = 5000000;

                const pay = egg_price * amount_item;
                if(userData.balance < pay){

                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}>** You don't have enough cash!**`)] });

                    await userData.save();
                    return;
                }

                userData.balance -= pay;
                userData.egg.egg_amount += amount_item;

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif.egg_gif})x**${amount_item.toLocaleString()}** and spend: ${gif.cash} **${pay.toLocaleString()}**`)] });
    
                await userData.save();
                return;
            }

            if(buyid == 4){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }

                const box_weapon_price = 1000000;

                if(userData.balance < box_weapon_price || userData.balance <= 0){

                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}>** You don't have enough cash!**`)] });

                    await userData.save();
                    return;
                }

                userData.balance -= box_weapon_price;

                const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif.box_weapon_gif}) and spend: ${gif.cash} **${box_weapon_price.toLocaleString()}**`)] });
                await sleep(2000);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> opening (${gif.box_weapon_gif})...`)] });
                await sleep(2000);

                const weapon_ran = getRandomInt(1, 11);
                const weapon = userData.weapon;

                if(weapon_ran == 1){
                    if(weapon.immortal_weapon == true){
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.immortal_item_gif} dismantal to ${gif.esen_gif}X**10,000**`)] });
                        userData.egg.esen += 10000;
                        await userData.save();
                        return;
                    }

                    weapon.immortal_weapon = true;
                    mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you got ${gif.immortal_item_gif}!`)] });

                }else if(weapon_ran >= 2 && weapon_ran <= 4){
                    const weapon_e_ran = getRandomInt(1, 4);
                    if(weapon_e_ran == 1){
                        if(weapon.critical_weapon == true){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.critical_item_gif} dismantal to ${gif.esen_gif}X**5,000**`)] });
                            userData.egg.esen += 5000;
                            await userData.save();
                            return;
                        }
        
                        weapon.critical_weapon = true;
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you got ${gif.critical_item_gif}!`)] });
                    }else if(weapon_e_ran == 2){
                        if(weapon.life_steal_weapon == true){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.life_steal_item_gif} dismantal to ${gif.esen_gif}X**5,000**`)] });
                            userData.egg.esen += 5000;
                            await userData.save();
                            return;
                        }

                        weapon.life_steal_weapon = true;
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you got ${gif.life_steal_item_gif}!`)] });

                    }else if(weapon_e_ran == 3){
                        if(weapon.mana_weapon == true){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.mana_item_gif} dismantal to ${gif.esen_gif}X**5,000**`)] });
                            userData.egg.esen += 5000;
                            await userData.save();
                            return;
                        }

                        weapon.mana_weapon = true;
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you got ${gif.mana_item_gif}!`)] });
                    }

                }else if(weapon_ran >= 5 && weapon_ran <= 10){
                    const weapon_r_ran = getRandomInt(1, 3);
                    if(weapon_r_ran == 1){
                        if(weapon.demage_weapon == true){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.demage_item_gif} dismantal to ${gif.esen_gif}X**2,000**`)] });
                            userData.egg.esen += 2000;
                            await userData.save();
                            return;
                        }
        
                        weapon.demage_weapon = true;
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you got ${gif.demage_item_gif}!`)] });
                    }else if(weapon_r_ran == 2){
                        if(weapon.defend_weapon == true){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.defend_item_gif} dismantal to ${gif.esen_gif}X**2,000**`)] });
                            userData.egg.esen += 2000;
                            await userData.save();
                            return;
                        }

                        weapon.defend_weapon = true;
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> you got ${gif.defend_item_gif}!`)] });
                    }
                }

                await userData.save();
                return;
            }

            if(buyid == 5){
                if(userData.holder_item.holder_item_bool == true){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> you already has ${gif.holder_item_gif}!`)] });
                    await userData.save();
                    return;
                }

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }

                const holder_item_price = 10000000;

                if(userData.balance < holder_item_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean luy krob te!`)] });
                    await userData.save();
                    return;
                }

                userData.balance -= holder_item_price;
                userData.holder_item.holder_item_bool = true;

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif.holder_item_gif}) and spend: ${gif.cash} **${holder_item_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 6){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const wcl_price = 200;

                if(userData.gold_coin < wcl_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    await userData.save();
                    return;
                }

                userData.gold_coin -= wcl_price;
                userData.gem['777'] += 1;

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['777']}) and spend: ${gif.gold_coin} **${wcl_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 7){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const wcf_price = 250;

                if(userData.gold_coin < wcf_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    await userData.save();
                    return;
                }

                userData.gold_coin -= wcf_price;
                userData.gem['999'] += 1;

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['999']}) and spend: ${gif.gold_coin} **${wcf_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 8){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }

                if(userData.premium.premium_bool == true){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> Already has Premium Yukio ${gif.premium_yukio}`)] });
                    return;
                }
                
                const premium_price = 200;

                if(userData.gold_coin < premium_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= premium_price;
                const currentTime = moment.tz(asiaTimezone);
                const cooldownEnd = currentTime.clone().add(31, 'days');

                userData.premium.premium_bool = true;
                userData.premium.premium_endDate = cooldownEnd;

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has Actived (${gif.premium_yukio}) and spend: ${gif.gold_coin} **${premium_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 9){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const lb_price = 50;

                if(userData.gold_coin < lb_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= lb_price;
                userData.gem['050'] += 50

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['050']}${toSuperscript(50, 50)}) and spend: ${gif.gold_coin} **${lb_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 10){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const wc_price = 50;

                if(userData.gold_coin < wc_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= wc_price;
                userData.gem['100'] += 50

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['100']}${toSuperscript(50, 50)}) and spend: ${gif.gold_coin} **${wc_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 11){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_patreon_price = 100;

                if(userData.gold_coin < ticket_patreon_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_patreon_price;
                userData.gem['014'] += 1

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['014']}) and spend: ${gif.gold_coin} **${ticket_patreon_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 12){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_jjk_price = 200;

                if(userData.gold_coin < ticket_jjk_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_jjk_price;
                userData.gem['jjk'] += 1
                userData.bg.push(`jjk_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['jjk']}) and spend: ${gif.gold_coin} **${ticket_jjk_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 13){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_op_price = 200;

                if(userData.gold_coin < ticket_op_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_op_price;
                userData.gem['op'] += 1
                userData.bg.push(`op_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['op']}) and spend: ${gif.gold_coin} **${ticket_op_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 14){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_opm_price = 200;

                if(userData.gold_coin < ticket_opm_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_opm_price;
                userData.gem['opm'] += 1
                userData.bg.push(`opm_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['opm']}) and spend: ${gif.gold_coin} **${ticket_opm_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 15){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_ds_price = 200;

                if(userData.gold_coin < ticket_ds_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_ds_price;
                userData.gem['ds'] += 1
                userData.bg.push(`ds_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['ds']}) and spend: ${gif.gold_coin} **${ticket_ds_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 16){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_cg_price = 200;

                if(userData.gold_coin < ticket_cg_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_cg_price;
                userData.gem['cg'] += 1
                userData.bg.push(`cg_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['cg']}) and spend: ${gif.gold_coin} **${ticket_cg_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 17){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_nt_price = 200;

                if(userData.gold_coin < ticket_nt_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_nt_price;
                userData.gem['nt'] += 1
                userData.bg.push(`nt_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['nt']}) and spend: ${gif.gold_coin} **${ticket_nt_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 18){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_nm_price = 200;

                if(userData.gold_coin < ticket_nm_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_nm_price;
                userData.gem['nm'] += 1
                userData.bg.push(`nm_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['nm']}) and spend: ${gif.gold_coin} **${ticket_nm_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 19){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_ms_price = 200;

                if(userData.gold_coin < ticket_ms_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_ms_price;
                userData.gem['ms'] += 1
                userData.bg.push(`ms_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['ms']}) and spend: ${gif.gold_coin} **${ticket_ms_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 20){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_cm_price = 200;

                if(userData.gold_coin < ticket_cm_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_cm_price;
                userData.gem['cm'] += 1
                userData.bg.push(`cm_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['cm']}) and spend: ${gif.gold_coin} **${ticket_cm_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            if(buyid == 21){

                if(userData.balance == 0){
                    userData.balance = saveUserBalance;
                }
                
                const ticket_kn8_price = 200;

                if(userData.gold_coin < ticket_kn8_price){
                    message.reply({ embeds: [SimpleEmbed(`<@${user.id}> ot mean gold coin krob te!`)] });
                    return;
                }

                userData.gold_coin -= ticket_kn8_price;
                userData.gem['kn8'] += 1
                userData.bg.push(`kn8_bg`);

                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> has bought (${gif['kn8']}) and spend: ${gif.gold_coin} **${ticket_kn8_price.toLocaleString()}**`)] });

                await userData.save();
                return;
            }

            return;
        }catch(error){
            console.log(`buy error ${error}`);
        }
    },
};