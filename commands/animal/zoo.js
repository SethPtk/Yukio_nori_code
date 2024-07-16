const { toSuperscript, gif, getUser, splitMessage, sym, cooldown, SimpleEmbed} = require('../../functioon/function');

const space = '\u2006\u2006\u2006\u2006';
const SL = '\u2006\u2006';

const cooldowns = new Map();
let CDT = 25_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'z',
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

            let messageAnimal = `**🌿 🌱 🌳${user.displayName}'s zoo!🌳 🌿 🌱**\n`;
            let check_zero = false;
            let getAllAmount = [];
            let store_number = 0

            for(let i = 1; i <= 14; i++){
                for(let y = 1; y <= 10; y++){
                    if(userData.sat[`sat_${i}_${y}`] > 0){
                        getAllAmount.push(userData.sat[`sat_${i}_${y}`]);
                        check_zero = true;
                    }
                }
            }
            store_number = getAllAmount[0];
            for(let i = 0; i <= getAllAmount.length; i++){
                if(getAllAmount[i] > store_number){
                    store_number = getAllAmount[i];
                }
            }

            for(let i = 1; i <= 3; i++){
                messageAnimal += `${gif[`animal_rank_${i}`]}${space}`;
                for(let y = 1; y <= 5; y++){
                    if(userData.sat[`sat_${i}_${y}`] > 0){
                        messageAnimal += `${gif[`rank_${i}_${y}`]}${toSuperscript(userData.sat[`sat_${i}_${y}`], store_number)}${SL}`;
                    }else{
                        if(userData.sat[`sat_${i}_${y}_h`] > 0){
                            if(check_zero == true){
                                messageAnimal += `${gif[`rank_${i}_${y}`]}${toSuperscript(userData.sat[`sat_${i}_${y}`], store_number)}${SL}`;
                            }else{
                                messageAnimal += `${gif[`rank_${i}_${y}`]}${SL}`;
                            }
                        }else{
                            if(check_zero == true){
                                messageAnimal += `${gif.animal_lock}${toSuperscript(0, store_number)}${SL}`;
                            }else{
                                messageAnimal += `${gif.animal_lock}${SL}`;
                            }
                        }
                    }
                }
                messageAnimal += '\n';
            }

            //EPIC
            let ShowTotal_e = '';
            let Total_e = 0;
            const epic = 4;
            let epic_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${epic}_${i}`] > 0 || userData.sat[`sat_${epic}_${i}_h`] > 0){
                    epic_bool = true;
                }
            }
            if(epic_bool == true){ messageAnimal += `${gif[`animal_rank_${epic}`]}${space}`; Total_e = (userData.sat.sat_4_1_h+userData.sat.sat_4_2_h+userData.sat.sat_4_3_h+userData.sat.sat_4_4_h+userData.sat.sat_4_5_h); ShowTotal_e = `, E-${Total_e}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${epic}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${epic}_${i}`]}${toSuperscript(userData.sat[`sat_${epic}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${epic}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${epic}_${i}`]}${toSuperscript(userData.sat[`sat_${epic}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${epic}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(epic_bool == true){ messageAnimal += '\n'; }

            //MYTHICAL
            let ShowTotal_m = '';
            let Total_m = 0;
            const mythic = 5;
            let mythic_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${mythic}_${i}`] > 0 || userData.sat[`sat_${mythic}_${i}_h`] > 0){
                    mythic_bool = true;
                }
            }
            if(mythic_bool == true){ messageAnimal += `${gif[`animal_rank_${mythic}`]}${space}`; Total_m = (userData.sat.sat_5_1_h+userData.sat.sat_5_2_h+userData.sat.sat_5_3_h+userData.sat.sat_5_4_h+userData.sat.sat_5_5_h); ShowTotal_m = `, M-${Total_m}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${mythic}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${mythic}_${i}`]}${toSuperscript(userData.sat[`sat_${mythic}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${mythic}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${mythic}_${i}`]}${toSuperscript(userData.sat[`sat_${mythic}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${mythic}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(mythic_bool == true){ messageAnimal += '\n'; }

            //PETRON
            let ShowTotal_p = '';
            let Total_p = 0;
            const petron = 11;
            let petron_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${petron}_${i}`] > 0 || userData.sat[`sat_${petron}_${i}_h`] > 0){
                    petron_bool = true;
                }
            }
            if(petron_bool == true){ messageAnimal += `${gif[`animal_rank_${petron}`]}${space}`; Total_p = (userData.sat.sat_11_1_h+userData.sat.sat_11_2_h+userData.sat.sat_11_3_h+userData.sat.sat_11_4_h+userData.sat.sat_11_5_h); ShowTotal_p = `, P-${Total_p}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${petron}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${petron}_${i}`]}${toSuperscript(userData.sat[`sat_${petron}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${petron}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${petron}_${i}`]}${toSuperscript(userData.sat[`sat_${petron}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${petron}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(petron_bool == true){ messageAnimal += '\n'; }

            //CUSTOM PRETON
            let ShowTotal_cp = '';
            let Total_cp = 0;
            const cp = 10;
            let cp_bool = false;
            for(let i = 1; i <= 99; i++){
                if(userData.sat[`sat_${cp}_${i}`] > 0 || userData.sat[`sat_${cp}_${i}_h`] > 0){
                    cp_bool = true;
                }
            }
            let slotcp = 0;
            if(cp_bool == true){ messageAnimal += `${gif[`animal_rank_${cp}`]}${space}`; Total_cp = (userData.sat.sat_10_1_h+userData.sat.sat_10_2_h+userData.sat.sat_10_3_h+userData.sat.sat_10_4_h+userData.sat.sat_10_5_h); ShowTotal_cp = `, CP-${Total_cp}`; }
            for(let i = 1; i <= 99; i++){
                if(userData.sat[`sat_${cp}_${i}`] > 0){
                    if(slotcp == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; slotcp = 0; }
                    messageAnimal += `${gif[`rank_${cp}_${i}`]}${toSuperscript(userData.sat[`sat_${cp}_${i}`], store_number)}${SL}`;
                    slotcp += 1;
                }else{
                    if(userData.sat[`sat_${cp}_${i}_h`] > 0){
                        if(check_zero == true){
                            if(slotcp == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; slotcp = 0; }
                            messageAnimal += `${gif[`rank_${cp}_${i}`]}${toSuperscript(userData.sat[`sat_${cp}_${i}`], store_number)}${SL}`;
                            slotcp += 1;
                        }else{
                            if(slotcp == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; slotcp = 0; }
                            messageAnimal += `${gif[`rank_${cp}_${i}`]}${SL}`;
                            slotcp += 1;
                        }
                    }
                }
            }
            if(cp_bool == true){ messageAnimal += '\n'; }

            //LEGENDARY
            let ShowTotal_l = '';
            let Total_l = 0;
            const legendary = 6;
            let legendary_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${legendary}_${i}`] > 0 || userData.sat[`sat_${legendary}_${i}_h`] > 0){
                    legendary_bool = true;
                }
            }
            if(legendary_bool == true){ messageAnimal += `${gif[`animal_rank_${legendary}`]}${space}`; Total_l = (userData.sat.sat_6_1_h+userData.sat.sat_6_2_h+userData.sat.sat_6_3_h+userData.sat.sat_6_4_h+userData.sat.sat_6_5_h); ShowTotal_l = `, L-${Total_l}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${legendary}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${legendary}_${i}`]}${toSuperscript(userData.sat[`sat_${legendary}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${legendary}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${legendary}_${i}`]}${toSuperscript(userData.sat[`sat_${legendary}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${legendary}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(legendary_bool == true){ messageAnimal += '\n'; }

            //GEM
            let ShowTotal_g = '';
            let Total_g = 0;
            const gem = 7;
            let gem_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${gem}_${i}`] > 0 || userData.sat[`sat_${gem}_${i}_h`] > 0){
                    gem_bool = true;
                }
            }
            if(gem_bool == true){ messageAnimal += `${gif[`animal_rank_${gem}`]}${space}`; Total_g = (userData.sat.sat_7_1_h+userData.sat.sat_7_2_h+userData.sat.sat_7_3_h+userData.sat.sat_7_4_h+userData.sat.sat_7_5_h); ShowTotal_g = `, G-${Total_g}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${gem}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${gem}_${i}`]}${toSuperscript(userData.sat[`sat_${gem}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${gem}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${gem}_${i}`]}${toSuperscript(userData.sat[`sat_${gem}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${gem}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(gem_bool == true){ messageAnimal += '\n'; }

            //BOT
            let ShowTotal_b = '';
            let Total_b = 0;
            const bot = 12;
            let bot_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${bot}_${i}`] > 0 || userData.sat[`sat_${bot}_${i}_h`] > 0){
                    bot_bool = true;
                }
            }
            if(bot_bool == true){ messageAnimal += `${gif[`animal_rank_${bot}`]}${space}`; Total_b = (userData.sat.sat_12_1_h+userData.sat.sat_12_2_h+userData.sat.sat_12_3_h+userData.sat.sat_12_4_h+userData.sat.sat_12_5_h); ShowTotal_b = `, O-${Total_b}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${bot}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${bot}_${i}`]}${toSuperscript(userData.sat[`sat_${bot}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${bot}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${bot}_${i}`]}${toSuperscript(userData.sat[`sat_${bot}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${bot}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(bot_bool == true){ messageAnimal += '\n'; }

            //DISTORTED
            let ShowTotal_d = '';
            let Total_d = 0;
            const distorted = 13;
            let distorted_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${distorted}_${i}`] > 0 || userData.sat[`sat_${distorted}_${i}_h`] > 0){
                    distorted_bool = true;
                }
            }
            if(distorted_bool == true){ messageAnimal += `${gif[`animal_rank_${distorted}`]}${space}`; Total_d = (userData.sat.sat_13_1_h+userData.sat.sat_13_2_h+userData.sat.sat_13_3_h+userData.sat.sat_13_4_h+userData.sat.sat_13_5_h); ShowTotal_d = `, X-${Total_d}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${distorted}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${distorted}_${i}`]}${toSuperscript(userData.sat[`sat_${distorted}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${distorted}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${distorted}_${i}`]}${toSuperscript(userData.sat[`sat_${distorted}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${distorted}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(distorted_bool == true){ messageAnimal += '\n'; }

            //FEBLED
            let ShowTotal_f = '';
            let Total_f = 0;
            const febled = 8;
            let febled_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${febled}_${i}`] > 0 || userData.sat[`sat_${febled}_${i}_h`] > 0){
                    febled_bool = true;
                }
            }
            if(febled_bool == true){ messageAnimal += `${gif[`animal_rank_${febled}`]}${space}`; Total_f = (userData.sat.sat_8_1_h+userData.sat.sat_8_2_h+userData.sat.sat_8_3_h+userData.sat.sat_8_4_h+userData.sat.sat_8_5_h); ShowTotal_f = `, F-${Total_f}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${febled}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${febled}_${i}`]}${toSuperscript(userData.sat[`sat_${febled}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${febled}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${febled}_${i}`]}${toSuperscript(userData.sat[`sat_${febled}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${febled}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(febled_bool == true){ messageAnimal += '\n'; }

            //SPECAIL
            let ShowTotal_s = '';
            let Total_s = 0;
            const special = 9;
            let special_bool = false;
            for(let i = 1; i <= 10; i++){
                if(userData.sat[`sat_${special}_${i}`] > 0 || userData.sat[`sat_${special}_${i}_h`] > 0){
                    special_bool = true;
                }
            }
            let slots = 0;
            if(special_bool == true){ messageAnimal += `${gif[`animal_rank_${special}`]}${space}`; Total_s = (userData.sat.sat_9_1_h+userData.sat.sat_9_2_h+userData.sat.sat_9_3_h+userData.sat.sat_9_4_h+userData.sat.sat_9_5_h+userData.sat.sat_9_6_h+userData.sat.sat_9_7_h+userData.sat.sat_9_8_h+userData.sat.sat_9_9_h+userData.sat.sat_9_10_h); ShowTotal_s = `, S-${Total_s}`; }
            for(let i = 1; i <= 10; i++){
                if(userData.sat[`sat_${special}_${i}`] > 0){
                    if(slots == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; }
                    messageAnimal += `${gif[`rank_${special}_${i}`]}${toSuperscript(userData.sat[`sat_${special}_${i}`], store_number)}${SL}`;
                    slots += 1;
                }else{
                    if(userData.sat[`sat_${special}_${i}_h`] > 0){
                        if(check_zero == true){
                            if(slots == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; }
                            messageAnimal += `${gif[`rank_${special}_${i}`]}${toSuperscript(userData.sat[`sat_${special}_${i}`], store_number)}${SL}`;
                            slots += 1;
                        }else{
                            if(slots == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; }
                            messageAnimal += `${gif[`rank_${special}_${i}`]}${SL}`;
                            slots += 1;
                        }
                    }
                }
            }
            if(special_bool == true){ messageAnimal += '\n'; }

            //VERY COOL
            let ShowTotal_vc = '';
            let Total_vc = 0;
            const very_cool = 26;
            let very_cool_bool = false;
            for(let i = 1; i <= 10; i++){
                if(userData.sat[`sat_${very_cool}_${i}`] > 0 || userData.sat[`sat_${very_cool}_${i}_h`] > 0){
                    very_cool_bool = true;
                }
            }
            slots = 0;
            if(very_cool_bool == true){ messageAnimal += `${gif[`animal_rank_${very_cool}`]}${space}`; Total_vc = (userData.sat.sat_26_1_h+userData.sat.sat_26_2_h+userData.sat.sat_26_3_h+userData.sat.sat_26_4_h+userData.sat.sat_26_5_h+userData.sat.sat_26_6_h+userData.sat.sat_26_7_h+userData.sat.sat_26_8_h+userData.sat.sat_26_9_h+userData.sat.sat_26_10_h); ShowTotal_vc = `, VC-${Total_vc}`; }
            for(let i = 1; i <= 10; i++){
                if(userData.sat[`sat_${very_cool}_${i}`] > 0){
                    if(slots == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; }
                    messageAnimal += `${gif[`rank_${very_cool}_${i}`]}${toSuperscript(userData.sat[`sat_${very_cool}_${i}`], store_number)}${SL}`;
                    slots += 1;
                }else{
                    if(userData.sat[`sat_${very_cool}_${i}_h`] > 0){
                        if(check_zero == true){
                            if(slots == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; }
                            messageAnimal += `${gif[`rank_${very_cool}_${i}`]}${toSuperscript(userData.sat[`sat_${very_cool}_${i}`], store_number)}${SL}`;
                            slots += 1;
                        }else{
                            if(slots == 5){ messageAnimal += `\n${gif.blank_gif}${space}`; }
                            messageAnimal += `${gif[`rank_${very_cool}_${i}`]}${SL}`;
                            slots += 1;
                        }
                    }
                }
            }
            if(very_cool_bool == true){ messageAnimal += '\n'; }

            //HIDDEN
            let ShowTotal_h = '';
            let Total_h = 0;
            const hidden = 14;
            let hidden_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${hidden}_${i}`] > 0 || userData.sat[`sat_${hidden}_${i}_h`] > 0){
                    hidden_bool = true;
                }
            }
            if(hidden_bool == true){ messageAnimal += `${gif[`animal_rank_${hidden}`]}${space}`; Total_h = (userData.sat.sat_14_1_h+userData.sat.sat_14_2_h+userData.sat.sat_14_3_h+userData.sat.sat_14_4_h+userData.sat.sat_14_5_h); ShowTotal_h = `, V-${Total_h}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${hidden}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${hidden}_${i}`]}${toSuperscript(userData.sat[`sat_${hidden}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${hidden}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${hidden}_${i}`]}${toSuperscript(userData.sat[`sat_${hidden}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${hidden}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(hidden_bool == true){ messageAnimal += '\n'; }

            //DEMON SLAYER
            let ShowTotal_ds = '';
            let Total_ds = 0;
            const demon_slayer = 19;
            let demon_slayer_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${demon_slayer}_${i}`] > 0 || userData.sat[`sat_${demon_slayer}_${i}_h`] > 0){
                    demon_slayer_bool = true;
                }
            }
            if(demon_slayer_bool == true){ messageAnimal += `${gif[`animal_rank_${demon_slayer}`]}${space}`; Total_ds = (userData.sat.sat_19_1_h+userData.sat.sat_19_2_h+userData.sat.sat_19_3_h+userData.sat.sat_19_4_h+userData.sat.sat_19_5_h); ShowTotal_ds = `, DS-${Total_ds}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${demon_slayer}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${demon_slayer}_${i}`]}${toSuperscript(userData.sat[`sat_${demon_slayer}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${demon_slayer}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${demon_slayer}_${i}`]}${toSuperscript(userData.sat[`sat_${demon_slayer}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${demon_slayer}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(demon_slayer_bool == true){ messageAnimal += '\n'; }

            //ONE PUNCH MAN
            let ShowTotal_opm = '';
            let Total_opm = 0;
            const one_punch_man = 17;
            let one_punch_man_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${one_punch_man}_${i}`] > 0 || userData.sat[`sat_${one_punch_man}_${i}_h`] > 0){
                    one_punch_man_bool = true;
                }
            }
            if(one_punch_man_bool == true){ messageAnimal += `${gif[`animal_rank_${one_punch_man}`]}${space}`; Total_opm = (userData.sat.sat_17_1_h+userData.sat.sat_17_2_h+userData.sat.sat_17_3_h+userData.sat.sat_17_4_h+userData.sat.sat_17_5_h); ShowTotal_opm = `, OPM-${Total_opm}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${one_punch_man}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${one_punch_man}_${i}`]}${toSuperscript(userData.sat[`sat_${one_punch_man}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${one_punch_man}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${one_punch_man}_${i}`]}${toSuperscript(userData.sat[`sat_${one_punch_man}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${one_punch_man}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(one_punch_man_bool == true){ messageAnimal += '\n'; }

            //JUJUTSU kAISEN
            let ShowTotal_jjk = '';
            let Total_jjk = 0;
            const jujutsu_kaisen = 15;
            let jujutsu_kaisen_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${jujutsu_kaisen}_${i}`] > 0 || userData.sat[`sat_${jujutsu_kaisen}_${i}_h`] > 0){
                    jujutsu_kaisen_bool = true;
                }
            }
            if(jujutsu_kaisen_bool == true){ messageAnimal += `${gif[`animal_rank_${jujutsu_kaisen}`]}${space}`; Total_jjk = (userData.sat.sat_15_1_h+userData.sat.sat_15_2_h+userData.sat.sat_15_3_h+userData.sat.sat_15_4_h+userData.sat.sat_15_5_h); ShowTotal_jjk = `, JJK-${Total_jjk}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${jujutsu_kaisen}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${jujutsu_kaisen}_${i}`]}${toSuperscript(userData.sat[`sat_${jujutsu_kaisen}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${jujutsu_kaisen}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${jujutsu_kaisen}_${i}`]}${toSuperscript(userData.sat[`sat_${jujutsu_kaisen}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${jujutsu_kaisen}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(jujutsu_kaisen_bool == true){ messageAnimal += '\n'; }

            //ONE PIECE
            let ShowTotal_op = '';
            let Total_op = 0;
            const one_piece = 16;
            let one_piece_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${one_piece}_${i}`] > 0 || userData.sat[`sat_${one_piece}_${i}_h`] > 0){
                    one_piece_bool = true;
                }
            }
            if(one_piece_bool == true){ messageAnimal += `${gif[`animal_rank_${one_piece}`]}${space}`; Total_op = (userData.sat.sat_16_1_h+userData.sat.sat_16_2_h+userData.sat.sat_16_3_h+userData.sat.sat_16_4_h+userData.sat.sat_16_5_h); ShowTotal_op = `, OP-${Total_op}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${one_piece}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${one_piece}_${i}`]}${toSuperscript(userData.sat[`sat_${one_piece}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${one_piece}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${one_piece}_${i}`]}${toSuperscript(userData.sat[`sat_${one_piece}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${one_piece}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(one_piece_bool == true){ messageAnimal += '\n'; }

            //MASHLE
            let ShowTotal_ms = '';
            let Total_ms = 0;
            const mashle = 18;
            let mashle_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${mashle}_${i}`] > 0 || userData.sat[`sat_${mashle}_${i}_h`] > 0){
                    mashle_bool = true;
                }
            }
            if(mashle_bool == true){ messageAnimal += `${gif[`animal_rank_${mashle}`]}${space}`; Total_ms = (userData.sat.sat_18_1_h+userData.sat.sat_18_2_h+userData.sat.sat_18_3_h+userData.sat.sat_18_4_h+userData.sat.sat_18_5_h); ShowTotal_ms = `, MS-${Total_ms}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${mashle}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${mashle}_${i}`]}${toSuperscript(userData.sat[`sat_${mashle}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${mashle}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${mashle}_${i}`]}${toSuperscript(userData.sat[`sat_${mashle}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${mashle}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(mashle_bool == true){ messageAnimal += '\n'; }

            //NARUTO
            let ShowTotal_nt = '';
            let Total_nt = 0;
            const naruto = 21;
            let naruto_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${naruto}_${i}`] > 0 || userData.sat[`sat_${naruto}_${i}_h`] > 0){
                    naruto_bool = true;
                }
            }
            if(naruto_bool == true){ messageAnimal += `${gif[`animal_rank_${naruto}`]}${space}`; Total_nt = (userData.sat.sat_21_1_h+userData.sat.sat_21_2_h+userData.sat.sat_21_3_h+userData.sat.sat_21_4_h+userData.sat.sat_21_5_h); ShowTotal_nt = `, NT-${Total_nt}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${naruto}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${naruto}_${i}`]}${toSuperscript(userData.sat[`sat_${naruto}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${naruto}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${naruto}_${i}`]}${toSuperscript(userData.sat[`sat_${naruto}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${naruto}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(naruto_bool == true){ messageAnimal += '\n'; }

            //CHAINSAW MAN
            let ShowTotal_cm = '';
            let Total_cm = 0;
            const chainsaw_man = 23;
            let chainsaw_man_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${chainsaw_man}_${i}`] > 0 || userData.sat[`sat_${chainsaw_man}_${i}_h`] > 0){
                    chainsaw_man_bool = true;
                }
            }
            if(chainsaw_man_bool == true){ messageAnimal += `${gif[`animal_rank_${chainsaw_man}`]}${space}`; Total_cm = (userData.sat.sat_23_1_h+userData.sat.sat_23_2_h+userData.sat.sat_23_3_h+userData.sat.sat_23_4_h+userData.sat.sat_23_5_h); ShowTotal_cm = `, CM-${Total_cm}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${chainsaw_man}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${chainsaw_man}_${i}`]}${toSuperscript(userData.sat[`sat_${chainsaw_man}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${chainsaw_man}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${chainsaw_man}_${i}`]}${toSuperscript(userData.sat[`sat_${chainsaw_man}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${chainsaw_man}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(chainsaw_man_bool == true){ messageAnimal += '\n'; }

            //KAIJU NO 8
            let ShowTotal_kn8 = '';
            let Total_kn8 = 0;
            const kaiju_no_8 = 25;
            let kaiju_no_8_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${kaiju_no_8}_${i}`] > 0 || userData.sat[`sat_${kaiju_no_8}_${i}_h`] > 0){
                    kaiju_no_8_bool = true;
                }
            }
            if(kaiju_no_8_bool == true){ messageAnimal += `${gif[`animal_rank_${kaiju_no_8}`]}${space}`; Total_kn8 = (userData.sat.sat_25_1_h+userData.sat.sat_25_2_h+userData.sat.sat_25_3_h+userData.sat.sat_25_4_h+userData.sat.sat_25_5_h); ShowTotal_kn8 = `, KN8-${Total_kn8}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${kaiju_no_8}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${kaiju_no_8}_${i}`]}${toSuperscript(userData.sat[`sat_${kaiju_no_8}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${kaiju_no_8}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${kaiju_no_8}_${i}`]}${toSuperscript(userData.sat[`sat_${kaiju_no_8}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${kaiju_no_8}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(kaiju_no_8_bool == true){ messageAnimal += '\n'; }

            //HANUMAN
            let ShowTotal_nm = '';
            let Total_nm = 0;
            const hanuman = 22;
            let hanuman_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${hanuman}_${i}`] > 0 || userData.sat[`sat_${hanuman}_${i}_h`] > 0){
                    hanuman_bool = true;
                }
            }
            if(hanuman_bool == true){ messageAnimal += `${gif[`animal_rank_${hanuman}`]}${space}`; Total_nm = (userData.sat.sat_22_1_h+userData.sat.sat_22_2_h+userData.sat.sat_22_3_h+userData.sat.sat_22_4_h+userData.sat.sat_22_5_h); ShowTotal_nm = `, NM-${Total_nm}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${hanuman}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${hanuman}_${i}`]}${toSuperscript(userData.sat[`sat_${hanuman}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${hanuman}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${hanuman}_${i}`]}${toSuperscript(userData.sat[`sat_${hanuman}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${hanuman}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(hanuman_bool == true){ messageAnimal += '\n'; }

            //COLLECTION GIRL
            let ShowTotal_cg = '';
            let Total_cg = 0;
            const collection_girl = 20;
            let collection_girl_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${collection_girl}_${i}`] > 0 || userData.sat[`sat_${collection_girl}_${i}_h`] > 0){
                    collection_girl_bool = true;
                }
            }
            if(collection_girl_bool == true){ messageAnimal += `${gif[`animal_rank_${collection_girl}`]}${space}`; Total_cg = (userData.sat.sat_20_1_h+userData.sat.sat_20_2_h+userData.sat.sat_20_3_h+userData.sat.sat_20_4_h+userData.sat.sat_20_5_h); ShowTotal_cg = `, CG-${Total_cg}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${collection_girl}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${collection_girl}_${i}`]}${toSuperscript(userData.sat[`sat_${collection_girl}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${collection_girl}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${collection_girl}_${i}`]}${toSuperscript(userData.sat[`sat_${collection_girl}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${collection_girl}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(collection_girl_bool == true){ messageAnimal += '\n'; }

            //KOF
            let ShowTotal_kof = '';
            let Total_kof = 0;
            const kof = 24;
            let kof_bool = false;
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${kof}_${i}`] > 0 || userData.sat[`sat_${kof}_${i}_h`] > 0){
                    kof_bool = true;
                }
            }
            if(kof_bool == true){ messageAnimal += `${gif[`animal_rank_${kof}`]}${space}`; Total_kof = (userData.sat.sat_24_1_h+userData.sat.sat_24_2_h+userData.sat.sat_24_3_h+userData.sat.sat_24_4_h+userData.sat.sat_24_5_h); ShowTotal_kof = `, KOF-${Total_kof}`; }
            for(let i = 1; i <= 5; i++){
                if(userData.sat[`sat_${kof}_${i}`] > 0){
                    messageAnimal += `${gif[`rank_${kof}_${i}`]}${toSuperscript(userData.sat[`sat_${kof}_${i}`], store_number)}${SL}`;
                }else{
                    if(userData.sat[`sat_${kof}_${i}_h`] > 0){
                        if(check_zero == true){
                            messageAnimal += `${gif[`rank_${kof}_${i}`]}${toSuperscript(userData.sat[`sat_${kof}_${i}`], store_number)}${SL}`;
                        }else{
                            messageAnimal += `${gif[`rank_${kof}_${i}`]}${SL}`;
                        }
                    }
                }
            }
            if(kof_bool == true){ messageAnimal += '\n'; }

            const Total_c = (userData.sat.sat_1_1_h+userData.sat.sat_1_2_h+userData.sat.sat_1_3_h+userData.sat.sat_1_4_h+userData.sat.sat_1_5_h);
            const Total_u = (userData.sat.sat_2_1_h+userData.sat.sat_2_2_h+userData.sat.sat_2_3_h+userData.sat.sat_2_4_h+userData.sat.sat_2_5_h);
            const Total_r = (userData.sat.sat_3_1_h+userData.sat.sat_3_2_h+userData.sat.sat_3_3_h+userData.sat.sat_3_4_h+userData.sat.sat_3_5_h);
            const zoo_point = (Total_c+(Total_u*5)+(Total_r*20)+(Total_e*250)+(Total_m*3000)+(Total_l*10000)+(Total_g*20000)+(Total_f*100000)+(Total_s*500)+(Total_cp*25000)+(Total_p*500)+(Total_b*30000)+(Total_d*200000)+(Total_h*500000)+(Total_jjk*500000)+(Total_op*500000)+(Total_opm*500000)+(Total_ds*500000)+(Total_cg*500000)+(Total_nt)+(Total_nm*500000)+(Total_ms*500000)+(Total_cm*500000)+(Total_kof*500000)+(Total_kn8*500000)+(Total_vc*10000));

            const text_zoo = `**Zoo Points: __${zoo_point.toLocaleString()}__\n    C-${Total_c}, U-${Total_u}, R-${Total_r}${ShowTotal_e}${ShowTotal_m}${ShowTotal_p}${ShowTotal_cp}${ShowTotal_l}${ShowTotal_g}${ShowTotal_b}${ShowTotal_d}${ShowTotal_f}${ShowTotal_s}${ShowTotal_vc}${ShowTotal_h}${ShowTotal_jjk}${ShowTotal_op}${ShowTotal_opm}${ShowTotal_ds}${ShowTotal_cg}${ShowTotal_nt}${ShowTotal_nm}${ShowTotal_ms}${ShowTotal_cm}${ShowTotal_kof}${ShowTotal_kn8}**`;

            if(messageAnimal.length + text_zoo.length < 2000){
                messageAnimal += text_zoo;
                message.channel.send(`${messageAnimal}`);
            }else{
                const chunks = splitMessage(messageAnimal);
                for (const chunk of chunks) {
                    message.channel.send(chunk);
                }
                message.channel.send(text_zoo);
            }
        }catch(error){
            console.error(`zoo error ${error}`);
        }
    },
};