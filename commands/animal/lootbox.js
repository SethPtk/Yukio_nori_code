const { sleep, gif, getUser, getRandomInt, toSuperscript, cooldown, SimpleEmbed } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 5_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'lootbox',
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
            const Gem = userData.gem;
            let amount = args[0];

            if(amount == 'all'){ amount = userData.gem['050'] }
            if(!parseInt(amount)){ amount = 1; }

            if(amount > 50){
                amount = 50;
            }

            if(userData.gem['050'] < amount || userData.gem['050'] <= 0){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you do not have this item!`)] }); return; };

            userData.gem['050'] -= amount;
            try{ await userData.save(); }catch(error){}

            const mgs = await message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opening ${amount} lootboxs\n\n${gif.box_gem_opening_gif} all you got ...`)] });

            let gem = '';
            let messageLootbox = '';

            let allGems = [amount];
            let selectGems = [];
            let amountGem = [];

            for(let i = 0; i < amount; i++){
                while(gem.charAt(0) != '<'){
                    const gem_ran = getRandomInt(gif.startId+1, gif.engId+1);
                    if(gem_ran >= 10 && gem_ran <= 99){
                        gem_id = `0${gem_ran}`;
                    }else{
                        gem_id = `${gem_ran}`;
                    }

                    if(gem_id == '056' || gem_id == '070' || gem_id == '077'){
                        const l_ran = getRandomInt(1, 11);
                        if(l_ran == 1){
                            gem = `${gif[`${gem_id}`]}`;
                            allGems[i] = gem_id;
                        }else{
                            gem = `>`;
                        }
                    }else if(gem_id == '057' || gem_id == '071' || gem_id == '078'){
                        const f_ran = getRandomInt(1, 21);
                        if(f_ran == 1){
                            gem = `${gif[`${gem_id}`]}`;
                            allGems[i] = gem_id;
                        }else{
                            gem = `>`;
                        }
                    }else{
                        gem = `${gif[`${gem_id}`]}`;
                        allGems[i] = gem_id;
                    }
                    if(gem_id == '100'){
                        gem = `>`;
                    }
                }
                gem = '>';
            }
            for (let i = 0; i < allGems.length; i++) {
                if (!selectGems.includes(allGems[i])) {
                    let getAmountGem = 0;
                    for (const gem of allGems) {
                        if (gem === allGems[i]) {
                            getAmountGem += 1;
                        }
                    }
                    selectGems.push(allGems[i]);
                    amountGem.push(getAmountGem);
                    userData.gem[`${allGems[i]}`] += getAmountGem;
                }
            }
            
            let number = 0;
            for (const gem of selectGems) {
                let gemName = gif[gem];
                messageLootbox += `${gemName}${toSuperscript(amountGem[number], 1)}\u2006`;
                number += 1;
            }

            await sleep(3000);
            mgs.edit({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opened ${amount} lootboxes\n\n${gif.box_gem_opened_gif} all you got **${messageLootbox}**`)] });
            try{ await userData.save(); }catch(error){}
            return;
        }catch(error){
            console.log(`lootbox error ${error}`);
        }
    },
};
