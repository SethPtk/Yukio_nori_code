const { SimpleEmbed, getUser, sym, cooldown } = require('../../functioon/function');
const mongoose = require('mongoose');
const { userSchema } = require('../../users/user');
const User = mongoose.model('User', userSchema);

const cooldowns = new Map();
let CDT = 25_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'top',
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

            const type = args[0];
            if(type){
                let amount_user = parseInt(args[1]);
                if(amount_user >= 15){
                    amount_user = 15;
                }else{ amount_user = 5; }

                if(type == 'cash' || type == 'bal' || type == 'money'){
                    const topUsers = await User.find({}).sort({ balance: -1 }).limit(amount_user);      
                
                    let top = []

                    topUsers.forEach((user, index) => {
                        top[index] = user.userId;
                    });

                    let messageContent = "**Top Users cash global**\n\n";

                    let rank = 0;
                    for(const i of top){
                        rank += 1;
                        let userData = await getUser(i);

                        messageContent += `#${rank} <@${i}>${sym} cash: ${userData.balance.toLocaleString()}$${sym}\n\n`;
                    }

                    message.channel.send({ embeds: [SimpleEmbed(messageContent)] });
                    return;
                }else if(type == 'str' || type == 'streak' || type == 'b' || type == 'battle'){
                    const topUsers = await User.aggregate([
                        {
                            $match: { 
                                $or: [
                                    {'sat.team.streak': { $gt: 0, $exists: true }}, 
                                    {'sat.team.streak_two': { $gt: 0, $exists: true }}
                                ]
                            }
                        },
                        {
                            $addFields: {
                                maxStreak: { $max: ['$sat.team.streak', '$sat.team.streak_two'] }
                            }
                        },
                        {
                            $match: { maxStreak: { $exists: true, $ne: NaN } }
                        },
                        {
                            $sort: { maxStreak: -1 }
                        },
                        {
                            $limit: amount_user
                        }
                    ]);
                    
                    let messageContent = "**Top Users battle streak global**\n\n";
                    
                    let rank = 0;
                    for(const user of topUsers){
                        rank += 1;
                        const streak = user.sat.team.streak || 0;
                        const streakTwo = user.sat.team.streak_two || 0;
                    
                        messageContent += `#${rank} <@${user.userId}>${sym} team1: ${streak}, team2: ${streakTwo}${sym}\n\n`;
                    }
                    
                    message.channel.send({ embeds: [SimpleEmbed(messageContent)] });

                    return;
                }else if(type == 'xp' || type == 'lvl' || type == 'level'){
                    const topUsers = await User.find({}).sort({ 'levelSystem.xp': -1 }).limit(amount_user);      
                
                    let top = []

                    topUsers.forEach((user, index) => {
                        top[index] = user.userId;
                    });

                    let messageContent = "**Top Users level global**\n\n";

                    let rank = 0;
                    for(const i of top){
                        rank += 1;
                        let userData = await getUser(i);

                        messageContent += `#${rank} <@${i}>${sym} Level: ${userData.levelSystem.level.toLocaleString()} xp: ${userData.levelSystem.xp.toLocaleString()}${sym}\n\n`;
                    }

                    message.channel.send({ embeds: [SimpleEmbed(messageContent)] });
                    return;
                }else if(type == 'cmd' || type == 'command' || type == 'spam'){
                    const topUsers = await User.find({}).sort({ command_point: -1 }).limit(amount_user);      
                
                    let top = []

                    topUsers.forEach((user, index) => {
                        top[index] = user.userId;
                    });

                    let messageContent = "**Top Users Activity global**\n\n";

                    let rank = 0;
                    for(const i of top){
                        rank += 1;
                        let userData = await getUser(i);

                        messageContent += `#${rank} <@${i}>${sym} Activity: ${userData.command_point.toLocaleString()}${sym}\n\n`;
                    }

                    message.channel.send({ embeds: [SimpleEmbed(messageContent)] });
                    return;
                }else if(type == 'elo' || type == 'rank' || type == 'br'){
                    const topUsers = await User.find({}).sort({ elo: -1 }).limit(amount_user);      
                
                    let top = []

                    topUsers.forEach((user, index) => {
                        top[index] = user.userId;
                    });

                    let messageContent = "**Top Users Rank elo global**\n\n";

                    let rank = 0;
                    for(const i of top){
                        rank += 1;
                        let userData = await getUser(i);

                        messageContent += `#${rank} <@${i}>${sym} Rank Elo: ${userData.elo.toLocaleString()}${sym}\n\n`;
                    }

                    message.channel.send({ embeds: [SimpleEmbed(messageContent)] });
                    return;
                }else if(type == 'coin' || type == 'farm' || type == 't'){
                    const topUsers = await User.find({}).sort({ 'farm.coin': -1 }).limit(amount_user);      
                
                    let top = []

                    topUsers.forEach((user, index) => {
                        top[index] = user.userId;
                    });

                    let messageContent = "**Top Users Coin farm global**\n\n";

                    let rank = 0;
                    for(const i of top){
                        rank += 1;
                        let userData = await getUser(i);

                        messageContent += `#${rank} <@${i}>${sym} Coin: ${userData.farm.coin.toLocaleString()}${sym}\n\n`;
                    }

                    message.channel.send({ embeds: [SimpleEmbed(messageContent)] });
                    return;
                }
            }
        }catch(error){
            console.log(`top error ${error}`);
        }
    },
};
