const { SimpleEmbed, getUser, cooldown, sym } = require('../../functioon/function');

const cooldowns = new Map();
const CDT = 60_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'job',
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
            const mention = message.mentions.users.first();
            if(mention){
                let targetData = await getUser(mention.id);
                if(!targetData){
                    return;
                }
                let job = targetData.workSystem.job;

                if(job){
                    if(job == 'teacher'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${mention.id}> គឺជា 🧑‍🏫Teacher and Salary **5000$-10000$**`)] });
                        return;
                    }else if(job == 'fbc'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${mention.id}> គឺជា ⛹🏼FBC and Salary **4000$-20000$**`)] });
                        return;
                    }else if(job == 'worker'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${mention.id}> គឺជា 👷Worker and Salary **5000$-10000$**`)] });
                        return;
                    }else if( job == 'doctor'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${mention.id}> គឺជា 👨‍⚕️Doctor and Salary **7000$-15000$**`)] });
                        return;
                    }else if(job == 'seller'){
                        message.channel.send({ embeds: [SimpleEmbed(`<@${mention.id}> គឺជា 🤑Seller and Salary **6000$-12000$**`)] });
                        return;
                    }
                }else{
                    message.channel.send({ embeds: [SimpleEmbed(`<@${mention.id}> មិនទាន់មានការងារនៅឡើយទេ!`)] });
                    return;
                }
            }

            let job = userData.workSystem.job;

            if(job){
                if(job == 'teacher'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ការងាររបស់អ្នកគឺ 🧑‍🏫Teacher and Salary **5000$-10000$**`)] });
                    return;
                }else if(job == 'fbc'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ការងាររបស់អ្នកគឺ ⛹🏼FBC and Salary **4000$-20000$**`)] });
                    return;
                }else if(job == 'worker'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ការងាររបស់អ្នកគឺ 👷Worker and Salary **5000$-10000$**`)] });
                    return;
                }else if( job == 'doctor'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ការងាររបស់អ្នកគឺ 👨‍⚕️Doctor and Salary **7000$-15000$**`)] });
                    return;
                }else if(job == 'seller'){
                    message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> ការងាររបស់អ្នកគឺ 🤑Seller and Salary **6000$-12000$**`)] });
                    return;
                }
            }else{
                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកមិនទាន់មានការងារនៅឡើយទេ!`)] });
                return;
            }
        }catch(error){
            console.log(`job error ${error}`);
        }
    },
};