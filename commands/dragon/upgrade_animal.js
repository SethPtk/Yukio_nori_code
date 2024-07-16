const { SimpleEmbed, getUser, gif, cooldown, sym } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'upgrade',
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

            const animal = args[0];
            if(!animal || !['Sandshrew', 'sandshrew', 'Shiny', 'shiny', 'Metapod', 'metapod', 'rutr', 'Rutr', 'nicy', 'Nicy', 'fegar', 'Fegar', 'megagengar', 'Megagengar', 'onix', 'Onix', 'furfrou', 'Furfrou', 'bee', 'Bee', 'Elekid', 'elekid'].includes(animal)){
                message.reply({ embeds: [SimpleEmbed(`<@${user.id}> Enter name of animal!`)] });
                await userData.save();
                return;
            }

            let esen = parseInt(args[1]);
            if(message.content.includes('all')){
                esen = userData.egg.esen;
            }

            if(isNaN(esen)){
                message.reply({ embeds: [SimpleEmbed(`<@${user.id}> Enter amount of Esen!`)] });
                await userData.save();
                return;
            }

            if(userData.egg.esen < esen || userData.egg.esen <= 0){
                message.reply({ embeds: [SimpleEmbed(`<@${user.id}> os Esen hz!`)] });
                await userData.save();
                return;
            }

            const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
            if(userData.egg[animalName][`${animalName}_bool`] == false){
                message.reply({ embeds: [SimpleEmbed(`<@${user.id}> don't have this animal ${gif[`${animalName}_gif`]}`)] });
                return;
            }

            userData.egg.esen -= esen;
            userData.egg[animalName][`${animalName}_xp`] += esen;

            if(userData.egg[animalName][`${animalName}_ratelevel`] <= 0){
                userData.egg[animalName][`${animalName}_ratelevel`] = 100;
            }

            while(userData.egg[animalName][`${animalName}_xp`] >= userData.egg[animalName][`${animalName}_ratelevel`]){
                if(userData.egg[animalName][`${animalName}_xp`] < userData.egg[animalName][`${animalName}_ratelevel`]){
                    break;
                }
                userData.egg[animalName][`${animalName}_level`] += 1;
                userData.egg[animalName][`${animalName}_ratelevel`] *= 2;
                userData.egg[animalName][`${animalName}_HP`] += 200;
                userData.egg[animalName][`${animalName}_power`] += 5;
                userData.egg[animalName][`${animalName}_SM`] += 10;
            }

            message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> you spend ${gif.esen_gif} **${esen.toLocaleString()}** your ${gif[`${animalName}_gif`]} got Level: **${userData.egg[animalName][`${animalName}_level`]}**!`)] });
            await userData.save();
            return;
        }catch(error){
            console.log(`updrage error ${error}`);
        }
    },
};