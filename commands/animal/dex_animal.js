const { cooldown, customEmbed, checkOwnAnimal, getAnimalIdByName, checkRankAnimalById, checkPointAnimalById, checkSellAnimalById, getAnimalNameByName, gif, sym, SimpleEmbed, getUser } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 15_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'dex',
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

            const animal_name = args[0];
            
            const animal_id = getAnimalIdByName(animal_name);
            const name = getAnimalNameByName(animal_name); 

            if(!await checkOwnAnimal(name, user.id)){ message.reply({ embeds: [SimpleEmbed(`**Now <@${user.id}>** you do not own this animal!`)] }); return; }

            if(animal_id){
                const sat = gif[`rank_${animal_id}`];
                const animal_rank = checkRankAnimalById(animal_id);
                const sell = checkSellAnimalById(animal_id);
                const Points = checkPointAnimalById(animal_id);

                const hp = gif[`rank_${animal_id}_hp`];
                const str = gif[`rank_${animal_id}_str`];
                const pr = gif[`rank_${animal_id}_pr`];

                const wp = gif[`rank_${animal_id}_wp`];
                const mag = gif[`rank_${animal_id}_mag`];
                const mr = gif[`rank_${animal_id}_mr`];

                const embed = customEmbed()
                    .setTitle(`${sat} ${name}`)
                    .setColor('Blue')
                    .setDescription(`**Rank**: ${animal_rank}\n**sell**: ${sell}\n**Points**: ${Points}\n${gif.state_hp} ${sym}${hp}${sym} ${gif.state_str} ${sym}${str}${sym} ${gif.state_pr} ${sym}${pr}${sym}\n${gif.state_wp} ${sym}${wp}${sym} ${gif.state_mag} ${sym}${mag}${sym} ${gif.state_mr} ${sym}${mr}${sym}`)
                message.channel.send({ embeds: [embed] });
            }
            return;

        }catch(error){
            console.log(`error dex: ${error}`);
        }
    },
};