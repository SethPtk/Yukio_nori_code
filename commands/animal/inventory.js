const { toSuperscript, gif, getUser, sym, cooldown, SimpleEmbed} = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 10_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'inv',
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

            const gem = userData.gem;

            let messageInv = `**<@${user.id}>'s Inventory**\n\n`;

            let getAllAmount = [];
            let MaxAmount = 0;
            let gem_id = '';

            let jjk_bg_amount = 0;
            let op_bg_amount = 0;
            let opm_bg_amount = 0;
            let ds_bg_amount = 0;
            let cg_bg_amount = 0;
            let nt_bg_amount = 0;
            let nm_bg_amount = 0;
            let ms_bg_amount = 0;
            let cm_bg_amount = 0;
            let kof_bg_amount = 0;
            let kn8_bg_amount = 0;

            for(const bg of userData.bg){
                if(bg == 'jjk_bg'){
                    jjk_bg_amount += 1;
                }else if(bg == 'op_bg'){
                    op_bg_amount += 1;
                }else if(bg == 'opm_bg'){
                    opm_bg_amount += 1;
                }else if(bg == 'ds_bg'){
                    ds_bg_amount += 1;
                }else if(bg == 'cg_bg'){
                    cg_bg_amount += 1;
                }else if(bg == 'nt_bg'){
                    nt_bg_amount += 1;
                }else if(bg == 'nm_bg'){
                    nm_bg_amount += 1;
                }else if(bg == 'ms_bg'){
                    ms_bg_amount += 1;
                }else if(bg == 'cm_bg'){
                    cm_bg_amount += 1;
                }else if(bg == 'kof_bg'){
                    kof_bg_amount += 1;
                }else if(bg == 'kn8_bg'){
                    kn8_bg_amount += 1;
                }
            }

            for(let i = gif.startId; i <= gif.engId; i++){
                if(i >= 10 && i <= 99){
                    gem_id = `0${i}`;
                }else{
                    gem_id = `${i}`;
                }
                getAllAmount.push(gem[`${gem_id}`]);
            }
            MaxAmount = getAllAmount[0];
            for(let i = 0; i <= getAllAmount.length; i++){
                if(getAllAmount[i] > MaxAmount){
                    MaxAmount = getAllAmount[i];
                }
            }

            let great_sword_amount = 0;
            let defender_aegis_amount = 0;
            let wang_of_absorption_amount = 0;
            let bow_amount = 0;
            let energy_stuff_amount = 0;
            let healing_stuff_amount = 0;
            let orb_of_potency_amount = 0;
            let rune_of_the_forgotten_amount = 0;
            let crune_of_celebration_amount = 0;
            let spirit_stuff_amount = 0;
            let resurrection_staff_amount = 0;
            let culling_scythe_amount = 0;
            let poison_dagger_amount = 0;

            for(const allWp of userData.wp){
                const str = `${allWp}`;

                if(str.includes('great_sword')){
                    great_sword_amount += 1;
                }else if(str.includes('defender_aegis')){
                    defender_aegis_amount += 1;
                }else if(str.includes('wang_of_absorption')){
                    wang_of_absorption_amount += 1;
                }else if(str.includes('bow')){
                    bow_amount += 1;
                }else if(str.includes('energy_stuff')){
                    energy_stuff_amount += 1;
                }else if(str.includes('healing_stuff')){
                    healing_stuff_amount += 1;
                }else if(str.includes('orb_of_potency')){
                    orb_of_potency_amount += 1;
                }else if(str.includes('rune_of_the_forgotten')){
                    rune_of_the_forgotten_amount += 1;
                }else if(str.includes('crune_of_celebration')){
                    crune_of_celebration_amount += 1;
                }else if(str.includes('spirit_stuff')){
                    spirit_stuff_amount += 1;
                }else if(str.includes('resurrection_staff')){
                    resurrection_staff_amount += 1;
                }else if(str.includes('culling_scythe')){
                    culling_scythe_amount += 1;
                }else if(str.includes('poison_dagger')){
                    poison_dagger_amount += 1;
                }
            }

            if(great_sword_amount > MaxAmount){
                MaxAmount = great_sword_amount;
            }
            else if(defender_aegis_amount > MaxAmount){
                MaxAmount = defender_aegis_amount;
            }
            else if(wang_of_absorption_amount > MaxAmount){
                MaxAmount = wang_of_absorption_amount;
            }
            else if(bow_amount > MaxAmount){
                MaxAmount = bow_amount;
            }
            else if(energy_stuff_amount > MaxAmount){
                MaxAmount = energy_stuff_amount;
            }
            else if(healing_stuff_amount > MaxAmount){
                MaxAmount = healing_stuff_amount;
            }
            else if(orb_of_potency_amount > MaxAmount){
                MaxAmount = orb_of_potency_amount;
            }
            else if(spirit_stuff_amount > MaxAmount){
                MaxAmount = spirit_stuff_amount;
            }
            else if(resurrection_staff_amount > MaxAmount){
                MaxAmount = resurrection_staff_amount;
            }
            else if(culling_scythe_amount > MaxAmount){
                MaxAmount = culling_scythe_amount;

            }else if(poison_dagger_amount > MaxAmount){
                MaxAmount = poison_dagger_amount;
            }

            if(userData.gem['kof'] > MaxAmount){
                MaxAmount = userData.gem['kof'];
            }

            let slot = 0;

            for (let i = gif.startId; i <= gif.engId; i++) {
                if (i >= 10 && i <= 99) {
                    gem_id = `0${i}`;
                } else {
                    gem_id = `${i}`;
                }

                if (gif[`${gem_id}`]) {
                    if (gem[`${gem_id}`] != 0) {
                        if (slot >= 4) { 
                            messageInv += '\n'; 
                            slot = 0; 
                        }
                        messageInv += `${sym}${gem_id}${sym}${gif[`${gem_id}`]}${toSuperscript(gem[`${gem_id}`], MaxAmount)}\u2006\u2006\u2006\u2006`;
                        slot += 1;
                    }
                }
            }

            if(great_sword_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}101${sym}${gif.great_sword_gif}${toSuperscript(great_sword_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(healing_stuff_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}102${sym}${gif.healing_stuff_gif}${toSuperscript(healing_stuff_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(bow_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}103${sym}${gif.bow_gif}${toSuperscript(bow_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(rune_of_the_forgotten_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}104${sym}${gif.rune_of_the_forgotten_gif}${toSuperscript(rune_of_the_forgotten_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(defender_aegis_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}105${sym}${gif.defender_aegis_gif}${toSuperscript(defender_aegis_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(orb_of_potency_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}106${sym}${gif.orb_of_potency_gif}${toSuperscript(orb_of_potency_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(poison_dagger_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}108${sym}${gif.poison_dagger_gif}${toSuperscript(poison_dagger_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(wang_of_absorption_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}109${sym}${gif.wang_of_absorption_gif}${toSuperscript(wang_of_absorption_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(spirit_stuff_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}110${sym}${gif.spirit_stuff_gif}${toSuperscript(spirit_stuff_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(energy_stuff_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}111${sym}${gif.energy_stuff_gif}${toSuperscript(energy_stuff_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(resurrection_staff_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}114${sym}${gif.resurrection_staff_gif}${toSuperscript(resurrection_staff_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(culling_scythe_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}117${sym}${gif.culling_scythe_gif}${toSuperscript(culling_scythe_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['014'] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}014${sym}${gif['014']}${toSuperscript(userData.gem['014'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['jjk'] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}jjk${sym}${gif['jjk']}${toSuperscript(userData.gem['jjk'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['op'] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}op.${sym}${gif['op']}${toSuperscript(userData.gem['op'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['opm'] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}opm${sym}${gif['opm']}${toSuperscript(userData.gem['opm'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['ds'] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}ds.${sym}${gif['ds']}${toSuperscript(userData.gem['ds'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['cg'] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}cg.${sym}${gif['cg']}${toSuperscript(userData.gem['cg'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['nt'] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}nt.${sym}${gif['nt']}${toSuperscript(userData.gem['nt'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['nm'] > 0){
                if (slot >= 4) {
                    messageInv += '\n';
                    slot = 0;
                }
                messageInv += `${sym}nm.${sym}${gif['nm']}${toSuperscript(userData.gem['nm'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['ms'] > 0){
                if (slot >= 4) {
                    messageInv += '\n';
                    slot = 0;
                }
                messageInv += `${sym}ms.${sym}${gif['ms']}${toSuperscript(userData.gem['ms'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['cm'] > 0){
                if (slot >= 4) {
                    messageInv += '\n';
                    slot = 0;
                }
                messageInv += `${sym}cm.${sym}${gif['cm']}${toSuperscript(userData.gem['cm'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem['kn8'] > 0){
                if (slot >= 4) {
                    messageInv += '\n';
                    slot = 0;
                }
                messageInv += `${sym}kn8${sym}${gif['kn8']}${toSuperscript(userData.gem['kn8'], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(crune_of_celebration_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}122${sym}${gif.crune_of_celebration_gif}${toSuperscript(crune_of_celebration_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(jjk_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}jjk${sym}${gif.bg_gif}${toSuperscript(jjk_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(op_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}op.${sym}${gif.bg_gif}${toSuperscript(op_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(opm_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}opm${sym}${gif.bg_gif}${toSuperscript(opm_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(ds_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}ds.${sym}${gif.bg_gif}${toSuperscript(ds_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(cg_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}cg.${sym}${gif.bg_gif}${toSuperscript(cg_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(nt_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}nt.${sym}${gif.bg_gif}${toSuperscript(nt_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(nm_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}nm.${sym}${gif.bg_gif}${toSuperscript(nm_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(ms_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}ms.${sym}${gif.bg_gif}${toSuperscript(ms_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(cm_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}cm.${sym}${gif.bg_gif}${toSuperscript(cm_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(kof_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}kof${sym}${gif.bg_gif}${toSuperscript(kof_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(kn8_bg_amount > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}kn8${sym}${gif.bg_gif}${toSuperscript(kn8_bg_amount, MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }
    
            if(userData.gem[`kof`] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}kof${sym}${gif.kof_box}${toSuperscript(userData.gem[`kof`], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem[`777`] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}777${sym}${gif['777']}${toSuperscript(userData.gem[`777`], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            if(userData.gem[`999`] > 0){
                if (slot >= 4) { 
                    messageInv += '\n'; 
                    slot = 0; 
                }
                messageInv += `${sym}999${sym}${gif['999']}${toSuperscript(userData.gem[`999`], MaxAmount)}\u2006\u2006\u2006\u2006`;
                slot += 1;
            }

            message.channel.send({ embeds: [SimpleEmbed(messageInv)] });
        }catch(error){
            console.log(`inventory error ${error}`);
        }
    }
};