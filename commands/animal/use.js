const { sleep, gif, getUser, getRandomInt, generateRandomId, sym, SimpleEmbed, labelButton, twoButton, ButtonStyle, getCollectionButton, cooldown, toSuperscript} = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'use',
    async execute(client, message, args) {
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

        const Gem1 = args[0];
        const Gem2 = parseInt(args[1]);
        const Gem3 = parseInt(args[2]);

        try{
            if(Gem1){
                if((Gem2 == '050' && Gem3 == '050' || Gem2 == '100' && Gem3 == '100')){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>** can not use multiple time!`)] }); return; }
                if(Gem2){
                    if(Gem3){
                        await Item(Gem3, message, user);
                    }
                    await Item(Gem2, message, user);
                }
                await Item(Gem1, message, user);
            }
        }catch(error){
            message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>** Wrong syntax!`)] });
            return;
        }
    },
};

async function Item(item_id, message, user){
    const userData = await getUser(user.id);
    const Gem = userData.gem;
    let gem_id = '';

    if(item_id == 'kn8'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.kaiju_no_8.kn8_bool == true || userData.sat.kaiju_no_8.kn8_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your KN8 hunt **${gif.animal_rank_25} ${userData.sat.kaiju_no_8.kn8_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['kn8'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['kn8']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['kn8']}** for **100 time hunt ${gif.animal_rank_25}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['kn8'] -= 1;
                userData.sat.kaiju_no_8.kn8_bool = true;
                userData.sat.kaiju_no_8.kn8_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['kn8']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['cm']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'cm'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.chainsaw_man.cm_bool == true || userData.sat.chainsaw_man.cm_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your CM hunt **${gif.animal_rank_23} ${userData.sat.chainsaw_man.cm_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['cm'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['cm']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['cm']}** for **100 time hunt ${gif.animal_rank_23}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['cm'] -= 1;
                userData.sat.chainsaw_man.cm_bool = true;
                userData.sat.chainsaw_man.cm_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['cm']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['cm']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'ms'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.mashle.ms_bool == true || userData.sat.mashle.ms_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your MS hunt **${gif.animal_rank_18} ${userData.sat.mashle.ms_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['ms'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['ms']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['ms']}** for **100 time hunt ${gif.animal_rank_18}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['ms'] -= 1;
                userData.sat.mashle.ms_bool = true;
                userData.sat.mashle.ms_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['ms']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['ms']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'nm'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.hanuman.nm_bool == true || userData.sat.hanuman.nm_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your NM hunt **${gif.animal_rank_22} ${userData.sat.hanuman.nm_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['nm'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['nm']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['nm']}** for **100 time hunt ${gif.animal_rank_22}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['nm'] -= 1;
                userData.sat.hanuman.nm_bool = true;
                userData.sat.hanuman.nm_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['nm']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['nm']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'nt'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.naruto.nt_bool == true || userData.sat.naruto.nt_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your NT hunt **${gif.animal_rank_21} ${userData.sat.naruto.nt_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['nt'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['nt']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['nt']}** for **100 time hunt ${gif.animal_rank_21}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['nt'] -= 1;
                userData.sat.naruto.nt_bool = true;
                userData.sat.naruto.nt_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['nt']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['nt']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'cg'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.collection_girl.cg_bool == true || userData.sat.collection_girl.cg_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your CG hunt **${gif.animal_rank_20} ${userData.sat.collection_girl.cg_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['cg'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['cg']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['cg']}** for **100 time hunt ${gif.animal_rank_20}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['cg'] -= 1;
                userData.sat.collection_girl.cg_bool = true;
                userData.sat.collection_girl.cg_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['cg']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['cg']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'ds'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.demon_slayer.ds_bool == true || userData.sat.demon_slayer.ds_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your DS hunt **${gif.animal_rank_19} ${userData.sat.demon_slayer.ds_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['ds'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['ds']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['ds']}** for **100 time hunt ${gif.animal_rank_19}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['ds'] -= 1;
                userData.sat.demon_slayer.ds_bool = true;
                userData.sat.demon_slayer.ds_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['ds']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['ds']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'opm'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.one_punch_man.opm_bool == true || userData.sat.one_punch_man.opm_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your OPM hunt **${gif.animal_rank_17} ${userData.sat.one_punch_man.opm_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['opm'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['opm']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['opm']}** for **100 time hunt ${gif.animal_rank_17}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['opm'] -= 1;
                userData.sat.one_punch_man.opm_bool = true;
                userData.sat.one_punch_man.opm_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['opm']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['opm']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'op'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.one_piece.op_bool == true || userData.sat.one_piece.op_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your OP hunt **${gif.animal_rank_16} ${userData.sat.one_piece.op_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['op'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['op']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['op']}** for **100 time hunt ${gif.animal_rank_16}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['op'] -= 1;
                userData.sat.one_piece.op_bool = true;
                userData.sat.one_piece.op_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['op']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['op']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == 'jjk'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.jujutsu_kaisen.jjk_bool == true || userData.sat.jujutsu_kaisen.jjk_hunt > 0){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your JJK hunt **${gif.animal_rank_15} ${userData.sat.jujutsu_kaisen.jjk_hunt} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['jjk'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['jjk']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['jjk']}** for **100 time hunt ${gif.animal_rank_15}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['jjk'] -= 1;
                userData.sat.jujutsu_kaisen.jjk_bool = true;
                userData.sat.jujutsu_kaisen.jjk_hunt = 100;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['jjk']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['jjk']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == '014'){
        const use_button = labelButton('use_button', 'Use Ticket', ButtonStyle.Primary);
        const cancel_button = labelButton('cancel_button', 'Cancel', ButtonStyle.Danger);

        const allButton = twoButton(use_button, cancel_button);

        if(userData.sat.patreon.patreon_bool == true){
            use_button.setDisabled(true);
            cancel_button.setDisabled(true);

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> your patreon hunt **${gif.animal_rank_11} ${userData.sat.patreon.patreon_left} left, ${gif.animal_rank_10} ${userData.sat.patreon.custom_patreon_left} left**`).setColor('#ABABAB')], components: [allButton] });
            return;
        }
        
        if(userData.gem['014'] <= 0){ return; };

        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['014']} Ticket?**`).setColor('Red')], components: [allButton] });

        const collector = getCollectionButton(mgs, 60_000);

        collector.on('collect', async (interaction) =>{
            if(interaction.member.user.id != user.id){ await interaction.reply({content: `This Button is not for you`, ephemeral: true, }); return; }

            if(interaction.customId == 'use_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> your patreon has been start by you using **1 ${gif['014']}** for **5 ${gif.animal_rank_11}, 1 ${gif.animal_rank_10}**`).setColor('#ABABAB')], components: [allButton] });
                userData.gem['014'] -= 1;
                userData.sat.patreon.patreon_bool = true;
                userData.sat.patreon.patreon_left = 5;
                userData.sat.patreon.custom_patreon_left = 1;
                try{
                    await userData.save();
                }catch(error){}
                collector.stop();
                return;
            }
            if(interaction.customId == 'cancel_button'){
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);

                await interaction.update({ embeds: [SimpleEmbed(`<@${user.id}> cancel using **${gif['014']} Ticket**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                use_button.setDisabled(true);
                cancel_button.setDisabled(true);
                mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> are you sure you want to redeen **1 ${gif['014']} Ticket?**`).setColor('#3D3D3D')], components: [allButton] });
                collector.stop();
                return;
            }
        });

        return;
    }

    if(item_id == '777'){
        if(userData.gem['777'] <= 0){ return; };
        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a weapon crate **Legendary**[${gif.animal_rank_6}]\n\n${gif.weapon_crate_legendary_opening_gif} and find a ...`).setColor("Yellow").setTimestamp()] });
        Gem['777'] -= 1;

        const weapon_ran = getRandomInt(1, 12);
        const rank_ran = getRandomInt(95, 100);
        let weapon_id = generateRandomId(6);
        const passive_ran = getRandomInt(1, 13);
        const passive_ran_two = getRandomInt(1, 4);

        if(userData.wp.length >= 1){
            for(const allwp of userData.wp){
                const str = `${allwp}`;
                const [id, name, rank, passive, percen, boolStr] = str.split(' ');
                
                if(`${weapon_id}` == id){
                    weapon_id = generateRandomId(6);
                }
            }
        }

        let rank = '';
        let rank_gif = '';
        let weapon = '';
        let passive = '';
        let passive_two = '';

        if(rank_ran > 0 && rank_ran <= 20){
            rank = 'common';
            rank_gif = gif.animal_rank_1;
        }else if(rank_ran >= 21 && rank_ran <= 40){
            rank = 'uncommon';
            rank_gif = gif.animal_rank_2;
        }else if(rank_ran >= 41 && rank_ran <= 60){
            rank = 'rare';
            rank_gif = gif.animal_rank_3;
        }else if(rank_ran >= 61 && rank_ran <= 80){
            rank = 'epic';
            rank_gif = gif.animal_rank_4;
        }else if(rank_ran >= 81 && rank_ran <= 94){
            rank = 'mythical';
            rank_gif = gif.animal_rank_5;
        }else if(rank_ran >= 95 && rank_ran <= 99){
            const legendary_ran = getRandomInt(1, 2);
            if(legendary_ran == 1){
                rank = 'legendary';
                rank_gif = gif.animal_rank_6;
            }else{
                rank_ran = getRandomInt(1, 95);
                if(rank_ran > 0 && rank_ran <= 20){
                    rank = 'common';
                    rank_gif = gif.animal_rank_1;
                }else if(rank_ran >= 21 && rank_ran <= 40){
                    rank = 'uncommon';
                    rank_gif = gif.animal_rank_2;
                }else if(rank_ran >= 41 && rank_ran <= 60){
                    rank = 'rare';
                    rank_gif = gif.animal_rank_3;
                }else if(rank_ran >= 61 && rank_ran <= 80){
                    rank = 'epic';
                    rank_gif = gif.animal_rank_4;
                }else if(rank_ran >= 81 && rank_ran <= 94){
                    rank = 'mythical';
                    rank_gif = gif.animal_rank_5;
                }
            }
        }else if(rank_ran >= 100 && rank_ran <= 100){
            const febled_ran = getRandomInt(1, 2);
            if(febled_ran == 1){
                rank = 'febled';
                rank_gif = gif.animal_rank_8;
            }else{
                rank_ran = getRandomInt(1, 95);
                if(rank_ran > 0 && rank_ran <= 20){
                    rank = 'common';
                    rank_gif = gif.animal_rank_1;
                }else if(rank_ran >= 21 && rank_ran <= 40){
                    rank = 'uncommon';
                    rank_gif = gif.animal_rank_2;
                }else if(rank_ran >= 41 && rank_ran <= 60){
                    rank = 'rare';
                    rank_gif = gif.animal_rank_3;
                }else if(rank_ran >= 61 && rank_ran <= 80){
                    rank = 'epic';
                    rank_gif = gif.animal_rank_4;
                }else if(rank_ran >= 81 && rank_ran <= 94){
                    rank = 'mythical';
                    rank_gif = gif.animal_rank_5;
                }
            }
        }

        if(weapon_ran == 1){
            weapon = 'great_sword';
        }else if(weapon_ran == 2){
            weapon = 'defender_aegis';
        }else if(weapon_ran == 3){
            weapon = 'wang_of_absorption';
        }else if(weapon_ran == 4){
            weapon = 'bow';
        }else if(weapon_ran == 5){
            weapon = 'energy_stuff';
        }else if(weapon_ran == 6){
            weapon = 'healing_stuff';
        }else if(weapon_ran == 7){
            weapon = 'orb_of_potency';
            if(passive_ran_two == 1){
                passive_two = 'lifesteal_effect';
            }else if(passive_ran_two == 2){
                passive_two = 'regeneration_effect';
            }else if(passive_ran == 3){
                passive_two = 'sacrifice_Effect';
            }
        }else if(weapon_ran == 8){
            weapon = 'spirit_stuff';
        }else if(weapon_ran == 9){
            weapon = 'resurrection_staff';
        }else if(weapon_ran == 10){
            weapon = 'culling_scythe';
        }else if(weapon_ran == 11){
            weapon = 'poison_dagger';
        }

        if(passive_ran == 1){
            passive = 'physical_Resistance_effect';
        }else if(passive_ran == 2){
            passive = 'magic_Resistance_effect';
        }else if(passive_ran == 3){
            passive = 'strength_effect';
        }else if(passive_ran == 4){
            passive = 'magic_effect';
        }else if(passive_ran == 5){
            passive = 'health_point_effect';
        }else if(passive_ran == 6){
            passive = 'weapon_point_effect';
        }else if(passive_ran == 7){
            passive = 'lifesteal_effect';
        }else if(passive_ran == 8){
            passive = 'regeneration_effect';
        }else if(passive_ran == 9){
            passive = 'sacrifice_Effect';
        }else if(passive_ran == 10){
            passive = 'thorns_Effect';
        }else if(passive_ran == 11){
            passive = 'discharge_Effect';
        }else if(passive_ran == 12){
            passive = 'sprout_Effect';
        }

        const weapon_gif = gif[`${weapon}_${rank}_gif`];
        const passive_gif = gif[`${passive}_gif`];
        let passive_two_gif = '';
        if(passive_two){ passive_two_gif = gif[`${passive_two}_gif`]; }
        const weapon_name = `${sym}${weapon_id}${sym} ${rank_gif} ${weapon_gif} ${passive_gif}${passive_two_gif}`;

        information_weapon = `${weapon_id} ${weapon} ${rank} ${passive} ${rank_ran} false ${passive_two}`;
        userData.wp.push(`${information_weapon}`);

        await sleep(5000);
        mgs.edit({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a weapon crate **Legendary**[${gif.animal_rank_6}]\n\n${gif.weapon_crate_legendary_opened_gif} and find a **${weapon_name}** ${rank_ran}%`).setColor("Yellow").setTimestamp()] });
        try{
            await userData.save();
        }catch(error){}
        return;
    }

    if(item_id == '999'){
        if(userData.gem['999'] <= 0){ return; };
        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a weapon crate **Fabled**[${gif.animal_rank_8}]\n\n${gif.weapon_crate_fabled_opening_gif} and find a ...`).setColor("#bdebfc").setTimestamp()] });
        Gem['999'] -= 1;

        const weapon_ran = getRandomInt(1, 12);
        const rank_ran = getRandomInt(100, 101);
        let weapon_id = generateRandomId(6);
        const passive_ran = getRandomInt(1, 13);
        const passive_ran_two = getRandomInt(1, 4);

        if(userData.wp.length >= 1){
            for(const allwp of userData.wp){
                const str = `${allwp}`;
                const [id, name, rank, passive, percen, boolStr] = str.split(' ');
                
                if(`${weapon_id}` == id){
                    weapon_id = generateRandomId(6);
                }
            }
        }

        let rank = '';
        let rank_gif = '';
        let weapon = '';
        let passive = '';
        let passive_two = '';

        if(rank_ran > 0 && rank_ran <= 20){
            rank = 'common';
            rank_gif = gif.animal_rank_1;
        }else if(rank_ran >= 21 && rank_ran <= 40){
            rank = 'uncommon';
            rank_gif = gif.animal_rank_2;
        }else if(rank_ran >= 41 && rank_ran <= 60){
            rank = 'rare';
            rank_gif = gif.animal_rank_3;
        }else if(rank_ran >= 61 && rank_ran <= 80){
            rank = 'epic';
            rank_gif = gif.animal_rank_4;
        }else if(rank_ran >= 81 && rank_ran <= 94){
            rank = 'mythical';
            rank_gif = gif.animal_rank_5;
        }else if(rank_ran >= 95 && rank_ran <= 99){
            const legendary_ran = getRandomInt(1, 10000);
            if(legendary_ran == 1){
                rank = 'legendary';
                rank_gif = gif.animal_rank_6;
            }else{
                rank_ran = getRandomInt(1, 95);
                if(rank_ran > 0 && rank_ran <= 20){
                    rank = 'common';
                    rank_gif = gif.animal_rank_1;
                }else if(rank_ran >= 21 && rank_ran <= 40){
                    rank = 'uncommon';
                    rank_gif = gif.animal_rank_2;
                }else if(rank_ran >= 41 && rank_ran <= 60){
                    rank = 'rare';
                    rank_gif = gif.animal_rank_3;
                }else if(rank_ran >= 61 && rank_ran <= 80){
                    rank = 'epic';
                    rank_gif = gif.animal_rank_4;
                }else if(rank_ran >= 81 && rank_ran <= 94){
                    rank = 'mythical';
                    rank_gif = gif.animal_rank_5;
                }
            }
        }else if(rank_ran >= 100 && rank_ran <= 100){
            const febled_ran = getRandomInt(1, 2);
            if(febled_ran == 1){
                rank = 'febled';
                rank_gif = gif.animal_rank_8;
            }else{
                rank_ran = getRandomInt(1, 95);
                if(rank_ran > 0 && rank_ran <= 20){
                    rank = 'common';
                    rank_gif = gif.animal_rank_1;
                }else if(rank_ran >= 21 && rank_ran <= 40){
                    rank = 'uncommon';
                    rank_gif = gif.animal_rank_2;
                }else if(rank_ran >= 41 && rank_ran <= 60){
                    rank = 'rare';
                    rank_gif = gif.animal_rank_3;
                }else if(rank_ran >= 61 && rank_ran <= 80){
                    rank = 'epic';
                    rank_gif = gif.animal_rank_4;
                }else if(rank_ran >= 81 && rank_ran <= 94){
                    rank = 'mythical';
                    rank_gif = gif.animal_rank_5;
                }
            }
        }

        if(weapon_ran == 1){
            weapon = 'great_sword';
        }else if(weapon_ran == 2){
            weapon = 'defender_aegis';
        }else if(weapon_ran == 3){
            weapon = 'wang_of_absorption';
        }else if(weapon_ran == 4){
            weapon = 'bow';
        }else if(weapon_ran == 5){
            weapon = 'energy_stuff';
        }else if(weapon_ran == 6){
            weapon = 'healing_stuff';
        }else if(weapon_ran == 7){
            weapon = 'orb_of_potency';
            if(passive_ran_two == 1){
                passive_two = 'lifesteal_effect';
            }else if(passive_ran_two == 2){
                passive_two = 'regeneration_effect';
            }else if(passive_ran == 3){
                passive_two = 'sacrifice_Effect';
            }
        }else if(weapon_ran == 8){
            weapon = 'spirit_stuff';
        }else if(weapon_ran == 9){
            weapon = 'resurrection_staff';
        }else if(weapon_ran == 10){
            weapon = 'culling_scythe';
        }else if(weapon_ran == 11){
            weapon = 'poison_dagger';
        }

        if(passive_ran == 1){
            passive = 'physical_Resistance_effect';
        }else if(passive_ran == 2){
            passive = 'magic_Resistance_effect';
        }else if(passive_ran == 3){
            passive = 'strength_effect';
        }else if(passive_ran == 4){
            passive = 'magic_effect';
        }else if(passive_ran == 5){
            passive = 'health_point_effect';
        }else if(passive_ran == 6){
            passive = 'weapon_point_effect';
        }else if(passive_ran == 7){
            passive = 'lifesteal_effect';
        }else if(passive_ran == 8){
            passive = 'regeneration_effect';
        }else if(passive_ran == 9){
            passive = 'sacrifice_Effect';
        }else if(passive_ran == 10){
            passive = 'thorns_Effect';
        }else if(passive_ran == 11){
            passive = 'discharge_Effect';
        }else if(passive_ran == 12){
            passive = 'sprout_Effect';
        }

        const weapon_gif = gif[`${weapon}_${rank}_gif`];
        const passive_gif = gif[`${passive}_gif`];
        let passive_two_gif = '';
        if(passive_two){ passive_two_gif = gif[`${passive_two}_gif`]; }
        const weapon_name = `${sym}${weapon_id}${sym} ${rank_gif} ${weapon_gif} ${passive_gif}${passive_two_gif}`;

        information_weapon = `${weapon_id} ${weapon} ${rank} ${passive} ${rank_ran} false ${passive_two}`;
        userData.wp.push(`${information_weapon}`);

        await sleep(5000);
        mgs.edit({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a weapon crate **Fabled**[${gif.animal_rank_8}]\n\n${gif.weapon_crate_fabled_opened_gif} and find a **${weapon_name}** ${rank_ran}%`).setColor("#bdebfc").setTimestamp()] });
        try{
            await userData.save();
        }catch(error){}
        return;
    }

    if(item_id == '100'){
        if(userData.gem['100'] <= 0){ return; };
        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a weapon crate\n\n${gif.crate_opening_gif} and find a ...`)] });
        Gem['100'] -= 1;

        const weapon_ran = getRandomInt(1, 12);
        const rank_ran = getRandomInt(1, 101);
        let weapon_id = generateRandomId(6);
        const passive_ran = getRandomInt(1, 13);
        const passive_ran_two = getRandomInt(1, 4);

        if(userData.wp.length >= 1){
            for(const allwp of userData.wp){
                const str = `${allwp}`;
                const [id, name, rank, passive, percen, boolStr] = str.split(' ');
                
                if(`${weapon_id}` == id){
                    weapon_id = generateRandomId(6);
                }
            }
        }

        let rank = '';
        let rank_gif = '';
        let weapon = '';
        let passive = '';
        let passive_two = '';

        if(rank_ran > 0 && rank_ran <= 20){
            rank = 'common';
            rank_gif = gif.animal_rank_1;
        }else if(rank_ran >= 21 && rank_ran <= 40){
            rank = 'uncommon';
            rank_gif = gif.animal_rank_2;
        }else if(rank_ran >= 41 && rank_ran <= 60){
            rank = 'rare';
            rank_gif = gif.animal_rank_3;
        }else if(rank_ran >= 61 && rank_ran <= 80){
            rank = 'epic';
            rank_gif = gif.animal_rank_4;
        }else if(rank_ran >= 81 && rank_ran <= 94){
            rank = 'mythical';
            rank_gif = gif.animal_rank_5;
        }else if(rank_ran >= 95 && rank_ran <= 99){
            const legendary_ran = getRandomInt(1, 10000);
            if(legendary_ran == 1){
                rank = 'legendary';
                rank_gif = gif.animal_rank_6;
            }else{
                rank_ran = getRandomInt(1, 95);
                if(rank_ran > 0 && rank_ran <= 20){
                    rank = 'common';
                    rank_gif = gif.animal_rank_1;
                }else if(rank_ran >= 21 && rank_ran <= 40){
                    rank = 'uncommon';
                    rank_gif = gif.animal_rank_2;
                }else if(rank_ran >= 41 && rank_ran <= 60){
                    rank = 'rare';
                    rank_gif = gif.animal_rank_3;
                }else if(rank_ran >= 61 && rank_ran <= 80){
                    rank = 'epic';
                    rank_gif = gif.animal_rank_4;
                }else if(rank_ran >= 81 && rank_ran <= 94){
                    rank = 'mythical';
                    rank_gif = gif.animal_rank_5;
                }
            }
        }else if(rank_ran >= 100 && rank_ran <= 100){
            const febled_ran = getRandomInt(1, 100000);
            if(febled_ran == 1){
                rank = 'febled';
                rank_gif = gif.animal_rank_8;
            }else{
                rank_ran = getRandomInt(1, 95);
                if(rank_ran > 0 && rank_ran <= 20){
                    rank = 'common';
                    rank_gif = gif.animal_rank_1;
                }else if(rank_ran >= 21 && rank_ran <= 40){
                    rank = 'uncommon';
                    rank_gif = gif.animal_rank_2;
                }else if(rank_ran >= 41 && rank_ran <= 60){
                    rank = 'rare';
                    rank_gif = gif.animal_rank_3;
                }else if(rank_ran >= 61 && rank_ran <= 80){
                    rank = 'epic';
                    rank_gif = gif.animal_rank_4;
                }else if(rank_ran >= 81 && rank_ran <= 94){
                    rank = 'mythical';
                    rank_gif = gif.animal_rank_5;
                }
            }
        }

        if(weapon_ran == 1){
            weapon = 'great_sword';
        }else if(weapon_ran == 2){
            weapon = 'defender_aegis';
        }else if(weapon_ran == 3){
            weapon = 'wang_of_absorption';
        }else if(weapon_ran == 4){
            weapon = 'bow';
        }else if(weapon_ran == 5){
            weapon = 'energy_stuff';
        }else if(weapon_ran == 6){
            weapon = 'healing_stuff';
        }else if(weapon_ran == 7){
            weapon = 'orb_of_potency';
            if(passive_ran_two == 1){
                passive_two = 'lifesteal_effect';
            }else if(passive_ran_two == 2){
                passive_two = 'regeneration_effect';
            }else if(passive_ran == 3){
                passive_two = 'sacrifice_Effect';
            }
        }else if(weapon_ran == 8){
            weapon = 'spirit_stuff';
        }else if(weapon_ran == 9){
            weapon = 'resurrection_staff';
        }else if(weapon_ran == 10){
            weapon = 'culling_scythe';
        }else if(weapon_ran == 11){
            weapon = 'poison_dagger';
        }

        if(passive_ran == 1){
            passive = 'physical_Resistance_effect';
        }else if(passive_ran == 2){
            passive = 'magic_Resistance_effect';
        }else if(passive_ran == 3){
            passive = 'strength_effect';
        }else if(passive_ran == 4){
            passive = 'magic_effect';
        }else if(passive_ran == 5){
            passive = 'health_point_effect';
        }else if(passive_ran == 6){
            passive = 'weapon_point_effect';
        }else if(passive_ran == 7){
            passive = 'lifesteal_effect';
        }else if(passive_ran == 8){
            passive = 'regeneration_effect';
        }else if(passive_ran == 9){
            passive = 'sacrifice_Effect';
        }else if(passive_ran == 10){
            passive = 'thorns_Effect';
        }else if(passive_ran == 11){
            passive = 'discharge_Effect';
        }else if(passive_ran == 12){
            passive = 'sprout_Effect';
        }

        const weapon_gif = gif[`${weapon}_${rank}_gif`];
        const passive_gif = gif[`${passive}_gif`];
        let passive_two_gif = '';
        if(passive_two){ passive_two_gif = gif[`${passive_two}_gif`]; }
        const weapon_name = `${sym}${weapon_id}${sym} ${rank_gif} ${weapon_gif} ${passive_gif}${passive_two_gif}`;

        information_weapon = `${weapon_id} ${weapon} ${rank} ${passive} ${rank_ran} false ${passive_two}`;
        userData.wp.push(`${information_weapon}`);

        await sleep(3000);
        mgs.edit({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a weapon crate\n\n${gif.box_gem_opened_gif} and find a **${weapon_name}** ${rank_ran}%`)] });
        try{
            await userData.save();
        }catch(error){}
        return;
    }

    if(item_id == '050' || item_id == '50'){
        if(userData.gem['050'] <= 0){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you do not have this item!`)] }); return; };
        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a lootbox\n\n${gif.box_gem_opening_gif} and find a ...`)] });
        Gem['050'] -= 1;

        let gem = '';
        let gem_name = '';

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
                    gem_name = `${gif[`${gem_id}_name`]}`;
                }else{
                    gem = `>`;
                }
            }else if(gem_id == '057' || gem_id == '071' || gem_id == '078'){
                const f_ran = getRandomInt(1, 21);
                if(f_ran == 1){
                    gem = `${gif[`${gem_id}`]}`;
                    gem_name = `${gif[`${gem_id}_name`]}`;
                }else{
                    gem = `>`;
                }
            }else{
                gem = `${gif[`${gem_id}`]}`;
                gem_name = `${gif[`${gem_id}_name`]}`;
            }
            if(gem_id == '100'){
                gem = `>`;
            }
        }
        Gem[`${gem_id}`] += 1;

        await sleep(3000);
        mgs.edit({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a lootbox\n\n${gif.box_gem_opened_gif} and find a ${gem} **${gem_name}**`)] });
        try{
            await userData.save();
        }catch(error){}
        return;
    }

    if(item_id == 'kof'){
        if(userData.gem['kof'] <= 0){ return; };
        const mgs = await message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a **KOF Box**\n\n${gif.kof_box_opening_gif} and find a ...`).setImage('https://cdn.discordapp.com/attachments/1201917527228158022/1236166152124633159/banner_kof.png?ex=663704f1&is=6635b371&hm=9f7be3b78ed96ea7de36d00cb149141fa890c11a22cafd4ab7c5780ba50963a8&')] });
        Gem['kof'] -= 1;

        let messageKof = '';
        let kof_got = false;
        let image = 'https://cdn.discordapp.com/attachments/1201917527228158022/1236166153923989566/banner_opened_normal.png?ex=663704f1&is=6635b371&hm=db1746f8e35fc937a3a9db3df6a78e99fdfcea83f1b170aa15c380fd2d52e025&'

        for(let i = 1; i <= 5; i++){
            const kof_luck = getRandomInt(1, 51);
            if(kof_luck == 1 && kof_got == false){
                const kof_ran = getRandomInt(1, 6);
                if(kof_ran == 1){
                    image = 'https://cdn.discordapp.com/attachments/1201917527228158022/1236166153408221204/banner_opened_kyo.png?ex=663704f1&is=6635b371&hm=c8f0c76c6614f4dc1febf6beebccc5664b18571a37329e4359db438a4d23111b&';
                    messageKof += `${gif.rank_24_1}`;
                    userData.sat.sat_24_1 += 1;
                    userData.sat.sat_24_1_h += 1;
                    kof_got = true;

                }else if(kof_ran == 2){
                    image = 'https://cdn.discordapp.com/attachments/1201917527228158022/1236166152393199679/banner_opened_iori.png?ex=663704f1&is=6635b371&hm=60359cb37d2d50ef83f5692609350e6b6993377a5f6b6c383b3f28ad180a6802&';
                    messageKof += `${gif.rank_24_2}`;
                    userData.sat.sat_24_2 += 1;
                    userData.sat.sat_24_2_h += 1;
                    kof_got = true;

                }else if(kof_ran == 3){
                    image = 'https://cdn.discordapp.com/attachments/1201917527228158022/1236166152707637330/banner_opened_k_dash.png?ex=663704f1&is=6635b371&hm=33e81372086ec4cf34bea510f5af8f5dc7b7c065a1c8853df7917cda71046fd1&';
                    messageKof += `${gif.rank_24_3}`;
                    userData.sat.sat_24_3 += 1;
                    userData.sat.sat_24_3_h += 1;
                    kof_got = true;

                }else if(kof_ran == 4){
                    image = 'https://cdn.discordapp.com/attachments/1201917527228158022/1236166153672327218/banner_opened_mai.png?ex=663704f1&is=6635b371&hm=9992fed26ac409a8f7f58783777413fff1b5089bdb061d7248383770ffebce24&';
                    messageKof += `${gif.rank_24_4}`;
                    userData.sat.sat_24_4 += 1;
                    userData.sat.sat_24_4_h += 1;
                    kof_got = true;

                }else if(kof_ran == 5){
                    image = 'https://cdn.discordapp.com/attachments/1201917527228158022/1236166153034797077/banner_opened_kula.png?ex=663704f1&is=6635b371&hm=c951fa00f86b654c20a4abd621a5c21a9d5c4f677748b7fa5de687badb85ceb5&';
                    messageKof += `${gif.rank_24_5}`;
                    userData.sat.sat_24_5 += 1;
                    userData.sat.sat_24_5_h += 1;
                    kof_got = true;
                }
            }else if(kof_luck > 1 && kof_luck <= 30){
                const lootbox_amount_ran = getRandomInt(1, 3);
                messageKof += `${gif['050']}${toSuperscript(lootbox_amount_ran, lootbox_amount_ran)}`;
                userData.gem['050'] += lootbox_amount_ran;
            }else{
                const crate_amount_ran = getRandomInt(1, 3);
                messageKof += `${gif['100']}${toSuperscript(crate_amount_ran, crate_amount_ran)}`;
                userData.gem['100'] += crate_amount_ran;
            }
        }

        await sleep(3000);
        mgs.edit({ embeds: [SimpleEmbed(`**Now <@${user.id}>** opens a **KOF Box**\n\n${gif.kof_box_opened_gif} and find ${messageKof}`).setImage(image)] });
        try{ await userData.save(); }catch(error){}
        return;
    }

    if(item_id[0] != 0){
        gem_id = `0${item_id}`;
    }else{
        gem_id = `${item_id}`;
    }

    if(Gem[`${gem_id}`] <= 0){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you do not have this item!`)] }); return; };

    const gem_name = gif[`${gem_id}_name`];

    if(gem_name.includes('Hunting')){
        if(Gem.hunt_Gem_equipe){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you already using Hunting gem!`)] }); return; }

        if(gem_name.includes('Common')){
            Gem.hunt_Gem_percen = 25;
            Gem.hunt_Gem_addAnimal = 3;
            Gem.hunt_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 25 manual hunt will be increased by 1`)] });
        }else if(gem_name.includes('Uncommon')){
            Gem.hunt_Gem_percen = 25;
            Gem.hunt_Gem_addAnimal = 4;
            Gem.hunt_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 25 manual hunt will be increased by 3`)] });
        }else if(gem_name.includes('Rare')){
            Gem.hunt_Gem_percen = 50;
            Gem.hunt_Gem_addAnimal = 5;
            Gem.hunt_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 50 manual hunt will be increased by 4`)] });
        }else if(gem_name.includes('Epic')){
            Gem.hunt_Gem_percen = 75;
            Gem.hunt_Gem_addAnimal = 6;
            Gem.hunt_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 75 manual hunt will be increased by 5`)] });
        }else if(gem_name.includes('Mythical')){
            Gem.hunt_Gem_percen = 75;
            Gem.hunt_Gem_addAnimal = 7;
            Gem.hunt_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 75 manual hunt will be increased by 6`)] });
        }else if(gem_name.includes('Legendary')){
            Gem.hunt_Gem_percen = 100;
            Gem.hunt_Gem_addAnimal = 8;
            Gem.hunt_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 100 manual hunt will be increased by 7`)] });
        }else if(gem_name.includes('Febled')){
            Gem.hunt_Gem_percen = 100;
            Gem.hunt_Gem_addAnimal = 10;
            Gem.hunt_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 100 manual hunt will be increased by 9`)] });
        }
    }else if(gem_name.includes('Empowering')){
        if(Gem.empowering_Gem_equipe){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you already using Empowering gem!`)] }); return; }

        if(gem_name.includes('Common')){
            Gem.empowering_Gem_percen = 50;
            Gem.empowering_Gem_timeAniaml = 2;
            Gem.empowering_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 50 animals will be doubled! It can stack with Hunting gems!`)] });
        }else if(gem_name.includes('Uncommon')){
            Gem.empowering_Gem_percen = 100;
            Gem.empowering_Gem_timeAniaml = 2;
            Gem.empowering_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 100 animals will be doubled! It can stack with Hunting gems!`)] });
        }else if(gem_name.includes('Rare')){
            Gem.empowering_Gem_percen = 250;
            Gem.empowering_Gem_timeAniaml = 2;
            Gem.empowering_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 250 animals will be doubled! It can stack with Hunting gems!`)] });
        }else if(gem_name.includes('Epic')){
            Gem.empowering_Gem_percen = 450;
            Gem.empowering_Gem_timeAniaml = 2;
            Gem.empowering_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 450 animals will be doubled! It can stack with Hunting gems!`)] });
        }else if(gem_name.includes('Mythical')){
            Gem.empowering_Gem_percen = 525;
            Gem.empowering_Gem_timeAniaml = 2;
            Gem.empowering_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 525 animals will be doubled! It can stack with Hunting gems!`)] });
        }else if(gem_name.includes('Legendary')){
            Gem.empowering_Gem_percen = 800;
            Gem.empowering_Gem_timeAniaml = 2;
            Gem.empowering_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 800 animals will be doubled! It can stack with Hunting gems!`)] });
        }else if(gem_name.includes('Febled')){
            Gem.empowering_Gem_percen = 1000;
            Gem.empowering_Gem_timeAniaml = 2;
            Gem.empowering_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 1000 animals will be doubled! It can stack with Hunting gems!`)] });
        }
    }else if(gem_name.includes('Lucky')){
        if(Gem.lucky_Gem_equipe){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you already using Lucky gem!`)] }); return; }

        if(gem_name.includes('Common')){
            Gem.lucky_Gem_percen = 50;
            Gem.lucky_Gem_addChance = 1;
            Gem.lucky_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 50 animals will have a +1x higher chance of finding gem tiers!`)] });
        }else if(gem_name.includes('Uncommon')){
            Gem.lucky_Gem_percen = 100;
            Gem.lucky_Gem_addChance = 2;
            Gem.lucky_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 100 animals will have a +2x higher chance of finding gem tiers!`)] });
        }else if(gem_name.includes('Rare')){
            Gem.lucky_Gem_percen = 250;
            Gem.lucky_Gem_addChance = 3;
            Gem.lucky_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 250 animals will have a +3x higher chance of finding gem tiers!`)] });
        }else if(gem_name.includes('Epic')){
            Gem.lucky_Gem_percen = 450;
            Gem.lucky_Gem_addChance = 4;
            Gem.lucky_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 450 animals will have a +4x higher chance of finding gem tiers!`)] });
        }else if(gem_name.includes('Mythical')){
            Gem.lucky_Gem_percen = 525;
            Gem.lucky_Gem_addChance = 5;
            Gem.lucky_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 525 animals will have a +5x higher chance of finding gem tiers!`)] });
        }else if(gem_name.includes('Legendary')){
            Gem.lucky_Gem_percen = 800;
            Gem.lucky_Gem_addChance = 6;
            Gem.lucky_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 800 animals will have a +6x higher chance of finding gem tiers!`)] });
        }else if(gem_name.includes('Febled')){
            Gem.lucky_Gem_percen = 1000;
            Gem.lucky_Gem_addChance = 8;
            Gem.lucky_Gem_equipe = gem_id;

            message.channel.send({ embeds: [SimpleEmbed(`**Now <@${user.id}>**, you using a ${gif[`${gem_id}`]} ${gif[`${gem_id}_name`]}!\n\n**Now** Your next 800 animals will have a +6x higher chance of finding gem tiers!`)] });
        }
    }
    Gem[`${gem_id}`] -= 1;
    try{
        await userData.save();
    }catch(error){}
    return;
}