const { SimpleEmbed, sym, getUser, getRandomInt, gif, sleep, cooldown } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 60_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'apply',
    async execute(client, message, args) {
        try{
            const user = message.author;

            const getApply = args[0];
            if(getApply == 'as'){
                const getJob = args[1];

                const userData = await getUser(user.id);

                if(userData.premium.premium_bool){
                    if(!prem.includes(user.id)){
                        prem.push(user.id);
                    }
                }

                if(!['teacher','Teacher','doctor','Doctor','seller', 'Seller', 'Worker', 'worker', 'FBC', 'fbc'].includes(getJob)){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ការងារដែលអ្នកអាចធ្វើបានមានដូចជា 🧑‍🏫Teacher, 👨‍⚕️Doctor, 🤑Seller, 👷Wroker!, ⛹🏼FBC`)] });
                    return;
                }

                if(userData.workSystem.job){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកមានការងារជា ${userData.workSystem.job} បើសិនជាអ្នកចង់បានការងារថ្មី អ្នកត្រូវតែ ${sym}resign${sym} ការងាររបស់អ្នកជាមុនសិន`)] });
                    return;
                }

                if(cooldown(user.id, getId, cdId, CDT, message, cooldowns, prem)){
                    return;
                };
                
                if(getJob == 'FBC' || getJob == 'fbc'){
                    if(userData.workSystem.job == 'fbc'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកបានធ្វើជា ⛹🏼FBC រួចទៅហើយ`)] });
                        return;
                    }

                    const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកកំពុងស្ថិតនៅក្នុងការសម្ភាសន៍..${gif.dealer_gif}`)] });
                    await sleep(5000);

                    const pass_apply = getRandomInt(1, 5);
                    if(pass_apply == 1){
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> **អបអរសាទរ** អ្នកបានទទួលការងារជា ⛹🏼FBC`).setColor('Green')] });
                        userData.workSystem.job = 'fbc';
                        await userData.save();
                        return;
                    }else{
                        const HR = getRandomInt(1, 5);
                        if(HR == 1){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាអ្នកមិនអាចបង្វឹកទាត់បាល់បានទេព្រោះអីអ្នកគ្មានស្បែកជើង`).setColor('Red')] });
                            return;
                        }else if(HR == 2){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាអ្នកមិនអាចបង្វឹកទាត់បាល់បានទេព្រោះអីអ្នកមិនចេះលេងបាល់`).setColor('Red')] });
                            return;
                        }else if(HR == 3){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាអ្នកមិនអាចបង្វឹកទាត់បាល់បានទេព្រោះអីអ្នកអត់ល្បី`).setColor('Red')] });
                            return;
                        }else if(HR == 4){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាអ្នកមិនអាចបង្វឹកទាត់បាល់បានទេព្រោះអីអ្នកស្គមពេក`).setColor('Red')] });
                            return;
                        }
                    }
                }

                if(getJob == 'worker' || getJob == 'Worker'){
                    if(userData.workSystem.job == 'worker'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកបានធ្វើជា 👷អ្នកធើ្វសំណង់ រួចទៅហើយ`)] });
                        return;
                    }

                    const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកកំពុងស្ថិតនៅក្នុងការសម្ភាសន៍..${gif.dealer_gif}`)] });
                    await sleep(5000);

                    const pass_apply = getRandomInt(1, 5);
                    if(pass_apply == 1){
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> **អបអរសាទរ** អ្នកបានទទួលការងារជា 👷អ្នកធើ្វសំណង់`).setColor('Green')] });
                        userData.workSystem.job = 'worker';
                        await userData.save();
                        return;
                    }else{
                        const HR = getRandomInt(1, 5);
                        if(HR == 1){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាធ្វើការសំណង់មិនជាប់ ព្រោះអីអ្នកដៃតូចៗ`).setColor('Red')] });
                            return;
                        }else if(HR == 2){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាធ្វើការសំណង់មិនជាប់ព្រោះអីអ្នកកន្ត្រាក់ៗពេក`).setColor('Red')] });
                            return;
                        }else if(HR == 3){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាធ្វើការសំណង់មិនជាប់រស់អីថាស្គមពេក`).setColor('Red')] });
                            return;
                        }else if(HR == 4){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាធ្វើការសំណង់មិនជាប់ព្រោះអីអ្នកមិនចេះធ្វើសំណង់ទេ`).setColor('Red')] });
                            return;
                        }
                    }
                }

                if(getJob == 'Teacher' || getJob == 'teacher'){
                    if(userData.workSystem.job == 'teacher'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកបានធ្វើជា  🧑‍🏫Teacher រួចទៅហើយ`)] });
                        return;
                    }

                    const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកកំពុងស្ថិតនៅក្នុងការសម្ភាសន៍..${gif.dealer_gif}`)] });
                    await sleep(5000);

                    const pass_apply = getRandomInt(1, 5);
                    if(pass_apply == 1){
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> **អបអរសាទរ** អ្នកបានទទួលការងារជា  🧑‍🏫Teacher`).setColor('Green')] });
                        userData.workSystem.job = 'teacher';
                        await userData.save();
                        return;
                    }else{
                        const HR = getRandomInt(1, 5);
                        if(HR == 1){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR អ្នកសម្ភាសន៍មិនជាប់ទេព្រោះអីអ្នកមាត់ស្អុយពេក`).setColor('Red')] });
                            return;
                        }else if(HR == 2){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> អារម្មណ៍អត់ល្អ HR សួរច្រើនវ៉ៃលេង`).setColor('Red')] });
                            return;
                        }else if(HR == 3){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> យប់មិញអត់បានដេកដេកពេលសម្ភាសន៍`).setColor('Red')] });
                            return;
                        }else if(HR == 4){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> ដេកជ្រុលបើកឡានទៅសម្ភាសន៍អត់ទាន់`).setColor('Red')] });
                            return;
                        }
                    }
                }

                if(getJob == 'Doctor' || getJob == 'doctor'){
                    if(userData.workSystem.job == 'doctor'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកបានធ្វើជា 👨‍⚕️Doctor រួចទៅហើយ`)] });
                        return;
                    }

                    const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកកំពុងស្ថិតនៅក្នុងការសម្ភាសន៍..${gif.dealer_gif}`)] });
                    await sleep(5000);

                    const pass_apply = getRandomInt(1, 5);
                    if(pass_apply == 1){
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> **អបអរសាទរ** អ្នកបានទទួលការងារជា  👨‍⚕️Doctor`).setColor('Green')] });
                        userData.workSystem.job = 'doctor';
                        await userData.save();
                        return;
                    }else{
                        const HR = getRandomInt(1, 5);
                        if(HR == 1){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> ហៅHRផឹកពេលកំពុងសម្ភាសន៍`).setColor('Red')] });
                            return;
                        }else if(HR == 2){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> ទើបតែបែក ss ហើយ HR សួរច្រើនពេកវ៉ៃ HR ឡើងយំ`).setColor('Red')] });
                            return;
                        }else if(HR == 3){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> យប់មិញដេកម៉ោង 3សម្ភាសន៍វ៉ុលពេញនឹង`).setColor('Red')] });
                            return;
                        }else if(HR == 4){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR សួរចុះសួរឡើងដឹងថាសាវ៉ាអត់ឱ្យចូល`).setColor('Red')] });
                            return;
                        }
                    }
                }

                if(getJob == 'Seller' || getJob == 'seller'){
                    if(userData.workSystem.job == 'seller'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកបានធ្វើជា 🤑Seller រួចទៅហើយ`)] });
                        return;
                    }

                    const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកកំពុងស្ថិតនៅក្នុងការសម្ភាសន៍..${gif.dealer_gif}`)] });
                    await sleep(5000);

                    const pass_apply = getRandomInt(1, 5);
                    if(pass_apply == 1){
                        mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> **អបអរសាទរ** អ្នកបានទទួលការងារជា 🤑Seller`).setColor('Green')] });
                        userData.workSystem.job = 'seller';
                        await userData.save();
                        return;
                    }else{
                        const HR = getRandomInt(1, 5);
                        if(HR == 1){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> ធ្លាប់លក់បោកគេ`).setColor('Red')] });
                            return;
                        }else if(HR == 2){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> ចូលសម្ភាសន៍ពេលកំពុងចុកពោះ`).setColor('Red')] });
                            return;
                        }else if(HR == 3){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> HR ថាកន្តឿពេកអត់ឱ្យចូលទេ`).setColor('Red')] });
                            return;
                        }else if(HR == 4){
                            mgs.edit({ embeds: [SimpleEmbed(`<@${user.id}> យប់មិញអស់ 10 ដុល្លារម្នាក់ឯងឡើងសម្ភាន៍រាំពេញនឹង`).setColor('Red')] });
                            return;
                        }
                    }
                }

                return;
            }

            message.channel.send({ embeds: [SimpleEmbed(`Type: ${sym}apply as { Posistion }${sym} to Apply a job\nType: ${sym}resign${sym} to resign a job\nType: ${sym}work${sym} just to work!`)
                                                .setAuthor({ name: `${user.displayName}`, iconURL: user.displayAvatarURL()})
                                                .setColor('DarkBlue')
                                                .setTitle('Job lists')
                                                .addFields(
                                                    {name: `🧑‍🏫គ្រូបង្រៀន ( Teacher )`, value: `បង្រៀនដូចជាក្មេងៗមនុស្សធំឬក៏មនុស្សល្ងង់\nSalary from **5000$-10000$**`},
                                                    {name: `👨‍⚕️វេជ្ជបណ្ឌិត ( Doctor )`, value: `ជួយសង្គ្រោះមនុស្សឬក៏សម្លាប់មនុស្សពេលកំពុងវាកាត់\nSalary from **7000$-15000$**`},
                                                    {name: `🤑អ្នកលក់ ( Seller )`, value: `លក់គ្រប់យ៉ាងដូចជាខ្លួនប្រាំរបស់តូចៗឬធុងសំរាម\nSalary from **6000$-12000$**`},
                                                    {name: `👷អ្នកធើ្វសំណង់ ( Worker )`, value: `ការងារធ្វើសំណង់ធុងសំរាម\nSalary from **5000$-10000$**`},
                                                    {name: `⛹🏼គ្រូបង្វឹកទាត់បាល់ ( FBC )`, value: `បង្រៀនទាត់បាល់យកមេជើងស្អុយ\nSalary from **4000$-20000$**`},
                                                )
                                                .setTimestamp()
            ] });
        }catch(error){
            console.log(`apply error ${error}`);
        }
    },
};