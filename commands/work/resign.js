const { SimpleEmbed, getUser, sleep, cooldown, sym } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 600_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'resign',
    async execute(client, message, args) {
        try{
            const user = message.author;

            const userData = await getUser(user.id);

            if(userData.premium.premium_bool){
                if(!prem.includes(user.id)){
                    prem.push(user.id);
                }
            }
            
            let job = userData.workSystem.job;

            if(job){
                
                if(cooldown(user.id, getId, cdId, CDT, message, cooldowns, prem)){
                    return;
                };

                const mgs = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកកំពុង resigning ការងាររបស់អ្នក...`)] });
                await sleep(5000);
                mgs.edit({ embeds: [SimpleEmbed(`**${user.displayName}** អ្នកបាន resigned ការងាររបស់អ្នកជា ${job}`)] });
                userData.workSystem.job = '';
                await userData.save();
                return;
            }else{
                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> អ្នកមិនទាន់មានការងារនៅឡើយទេ!`)] });
                return;
            }
        }catch(error){
            console.log(`resign error ${error}`);
        }
    },
};