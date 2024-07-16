const { SimpleEmbed, getUser, getRandomInt, sleep, blackjackEmbed, gif, cooldown, syms } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 15_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'bj',
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

            let amount = parseInt(args[0]);
            let amount_cash = args[0];

            if(amount_cash == `${amount}k` || amount_cash == `${amount}K`){
                amount *= 1000;
            }

            if(amount_cash == 'all'){
                amount = userData.balance;
            }

            if(amount >= 250000){
                amount = 250000;
            }

            if(userData.balance < amount || userData.balance <= 0){
                message.reply({ embeds: [SimpleEmbed(`<@${user.id}>** You don't have enough cash!**`)] });
                return;
            }

            if(isNaN(amount)){
                return;
            }

            userData.balance -= amount;
            await userData.save();

            const luck = getRandomInt(1, 7);
            let pinpy_point = 0;

            let card_dealer_number = '';
            const card_dealer_ran = getRandomInt(1, 14);
            let dealer_point = 0;

            let card_dealer_number2 = '';
            let card_dealer_ran2 = getRandomInt(1, 14);
            let dealer_point2 = 0;

            if(card_dealer_ran > 0){
                if(card_dealer_ran == 1){
                    card_dealer_number = gif.one_red_gif;
                    dealer_point += 1;
        
                }else if(card_dealer_ran == 2){
                    card_dealer_number = gif.two_red_gif;
                    dealer_point += 2;
        
                }else if(card_dealer_ran == 3){
                    card_dealer_number = gif.three_red_gif;
                    dealer_point += 3;
        
                }else if(card_dealer_ran == 4){
                    card_dealer_number = gif.four_red_gif;
                    dealer_point += 4;
        
                }else if(card_dealer_ran == 5){
                    card_dealer_number = gif.five_red_gif;
                    dealer_point += 5;
        
                }else if(card_dealer_ran == 6){
                    card_dealer_number = gif.six_red_gif;
                    dealer_point += 6;
        
                }else if(card_dealer_ran == 7){
                    card_dealer_number = gif.seven_red_gif;
                    dealer_point += 7;
        
                }else if(card_dealer_ran == 8){
                    card_dealer_number = gif.eight_red_gif;
                    dealer_point += 8;
        
                }else if(card_dealer_ran == 9){
                    card_dealer_number = gif.nine_red_gif;
                    dealer_point += 9;
        
                }else if(card_dealer_ran == 10){
                    card_dealer_number = gif.ten_red_gif;
                    dealer_point += 0;
        
                }else if(card_dealer_ran == 11){
                    card_dealer_number = gif.j_red_gif;
                    dealer_point += 1;
        
                }else if(card_dealer_ran == 12){
                    card_dealer_number = gif.q_red_gif;
                    dealer_point += 2;
        
                }else if(card_dealer_ran == 13){
                    card_dealer_number = gif.k_red_gif;
                    dealer_point += 3;
        
                }
            }
            
            pinpy_point += dealer_point;

            if(luck <= 3){
                if(pinpy_point == 1){
                    card_dealer_ran2 = getRandomInt(7, 9);
                }
        
                if(pinpy_point >= 2 && pinpy_point < 4){
                    if(card_dealer_ran == 2){
                        const one = getRandomInt(1, 3);
                        if(one == 1){
                            card_dealer_ran2 = 7;
                        }else{
                            card_dealer_ran2 = getRandomInt(4, 7);
                        }
                    }else{
                        const two = getRandomInt(1, 3);
                        if(two == 1){
                            card_dealer_ran2 = 6;
                        }else{
                            card_dealer_ran2 = getRandomInt(3, 6);
                        }
                    }
                }
        
                if(pinpy_point >= 4 && pinpy_point < 6){
                    if(card_dealer_ran == 4){
                        const one = getRandomInt(1, 3);
                        if(one == 1){
                            card_dealer_ran2 = 5;
                        }else{
                            card_dealer_ran2 = getRandomInt(3, 4);
                        }
                    }else{
                        const two = getRandomInt(1, 3);
                        if(two == 1){
                            card_dealer_ran2 = 4;
                        }else{
                            card_dealer_ran2 = getRandomInt(3, 5);
                        }
                    }
                }
        
                if(pinpy_point >= 6 && pinpy_point < 8){
                    if(pinpy_point == 6){
                        const one = getRandomInt(1, 3);
                        if(one == 1){
                            card_dealer_ran2 = 3;
                        }else{
                            card_dealer_ran2 = getRandomInt(1, 3);
                        }
                    }else{
                        const two = getRandomInt(1, 3);
                        if(two == 1){
                            card_dealer_ran2 = 2;
                        }else{
                            card_dealer_ran2 = 10;
                        }
                    }
                }
        
                if(pinpy_point == 8){
                    const eight = getRandomInt(1, 3);
                    if(eight == 1){
                        card_dealer_ran2 = getRandomInt(9 ,11);
                    }else{
                        card_dealer_ran2 = 1;
                    }
                }
        
                if(pinpy_point == 9){
                    card_dealer_ran2 = getRandomInt(9 ,11);
                }
            }

            if(card_dealer_ran2 > 0){
                if(card_dealer_ran2 == 1){
                    card_dealer_number2 = gif.one_red_gif;
                    dealer_point2 += 1;
        
                }else if(card_dealer_ran2 == 2){
                    card_dealer_number2 = gif.two_red_gif;
                    dealer_point2 += 2;
        
                }else if(card_dealer_ran2 == 3){
                    card_dealer_number2 = gif.three_red_gif;
                    dealer_point2 += 3;
        
                }else if(card_dealer_ran2 == 4){
                    card_dealer_number2 = gif.four_red_gif;
                    dealer_point2 += 4;
        
                }else if(card_dealer_ran2 == 5){
                    card_dealer_number2 = gif.five_red_gif;
                    dealer_point2 += 5;
        
                }else if(card_dealer_ran2 == 6){
                    card_dealer_number2 = gif.six_red_gif;
                    dealer_point2 += 6;
        
                }else if(card_dealer_ran2 == 7){
                    card_dealer_number2 = gif.seven_red_gif;
                    dealer_point2 += 7;
        
                }else if(card_dealer_ran2 == 8){
                    card_dealer_number2 = gif.eight_red_gif;
                    dealer_point2 += 8;
        
                }else if(card_dealer_ran2 == 9){
                    card_dealer_number2 = gif.nine_red_gif;
                    dealer_point2 += 9;
        
                }else if(card_dealer_ran2 == 10){
                    card_dealer_number2 = gif.ten_red_gif;
                    dealer_point2 += 0;
        
                }else if(card_dealer_ran2 == 11){
                    card_dealer_number2 = gif.j_red_gif;
                    dealer_point2 += 1;
        
                }else if(card_dealer_ran2 == 12){
                    card_dealer_number2 = gif.q_red_gif;
                    dealer_point2 += 2;
        
                }else if(card_dealer_ran2 == 13){
                    card_dealer_number2 = gif.k_red_gif;
                    dealer_point2 += 3;
        
                }
            }

            let our_card_one = gif.back_card_gif;
            const our_card_ran_one = getRandomInt(1, 14);
            let our_point_one = 0;

            if(our_card_ran_one > 0){
                if(our_card_ran_one == 1){
                    our_card_one = gif.one_black_gif;
                    our_point_one += 1;
        
                }else if(our_card_ran_one == 2){
                    our_card_one = gif.two_black_gif;
                    our_point_one += 2;
        
                }else if(our_card_ran_one == 3){
                    our_card_one = gif.three_black_gif;
                    our_point_one += 3;
        
                }else if(our_card_ran_one == 4){
                    our_card_one = gif.four_black_gif;
                    our_point_one += 4;
        
                }else if(our_card_ran_one == 5){
                    our_card_one = gif.five_black_gif;
                    our_point_one += 5;
        
                }else if(our_card_ran_one == 6){
                    our_card_one = gif.six_black_gif;
                    our_point_one += 6;
        
                }else if(our_card_ran_one == 7){
                    our_card_one = gif.seven_black_gif;
                    our_point_one += 7;
        
                }else if(our_card_ran_one == 8){
                    our_card_one = gif.eight_black_gif;
                    our_point_one += 8;
        
                }else if(our_card_ran_one == 9){
                    our_card_one = gif.nine_black_gif;
                    our_point_one += 9;
        
                }else if(our_card_ran_one == 10){
                    our_card_one = gif.ten_black_gif;
                    our_point_one += 0;
        
                }else if(our_card_ran_one == 11){
                    our_card_one = gif.j_black_gif;
                    our_point_one += 1;
        
                }else if(our_card_ran_one == 12){
                    our_card_one = gif.q_black_gif;
                    our_point_one += 2;
        
                }else if(our_card_ran_one == 13){
                    our_card_one = gif.k_black_gif;
                    our_point_one += 3;
        
                }
            }

            let our_card_two = gif.back_card_gif;
            const our_card_ran_two = getRandomInt(1, 14);
            let our_point_two = 0;

            if(our_card_ran_two > 0){
                if(our_card_ran_two == 1){
                    our_card_two = gif.one_black_gif;
                    our_point_two += 1;
        
                }else if(our_card_ran_two == 2){
                    our_card_two = gif.two_black_gif;
                    our_point_two += 2;
        
                }else if(our_card_ran_two == 3){
                    our_card_two = gif.three_black_gif;
                    our_point_two += 3;
        
                }else if(our_card_ran_two == 4){
                    our_card_two = gif.four_black_gif;
                    our_point_two += 4;
        
                }else if(our_card_ran_two == 5){
                    our_card_two = gif.five_black_gif;
                    our_point_two += 5;
        
                }else if(our_card_ran_two == 6){
                    our_card_two = gif.six_black_gif;
                    our_point_two += 6;
        
                }else if(our_card_ran_two == 7){
                    our_card_two = gif.seven_black_gif;
                    our_point_two += 7;
        
                }else if(our_card_ran_two == 8){
                    our_card_two = gif.eight_black_gif;
                    our_point_two += 8;
        
                }else if(our_card_ran_two == 9){
                    our_card_two = gif.nine_black_gif;
                    our_point_two += 9;
        
                }else if(our_card_ran_two == 10){
                    our_card_two = gif.ten_black_gif;
                    our_point_two += 0;
        
                }else if(our_card_ran_two == 11){
                    our_card_two = gif.j_black_gif;
                    our_point_two += 1;
        
                }else if(our_card_ran_two == 12){
                    our_card_two = gif.q_black_gif;
                    our_point_two += 2;
        
                }else if(our_card_ran_two == 13){
                    our_card_two = gif.k_black_gif;
                    our_point_two += 3;
        
                }
            }

            let our_card_three = gif.back_card_gif;
            const our_card_ran_three = getRandomInt(1, 14);
            let our_point_three = 0;

            if(our_card_ran_three > 0){
                if(our_card_ran_three == 1){
                    our_card_three = gif.one_black_gif;
                    our_point_three += 1;
        
                }else if(our_card_ran_three == 2){
                    our_card_three = gif.two_black_gif;
                    our_point_three += 2;
        
                }else if(our_card_ran_three == 3){
                    our_card_three = gif.three_black_gif;
                    our_point_three += 3;
        
                }else if(our_card_ran_three == 4){
                    our_card_three = gif.four_black_gif;
                    our_point_three += 4;
        
                }else if(our_card_ran_three == 5){
                    our_card_three = gif.five_black_gif;
                    our_point_three += 5;
        
                }else if(our_card_ran_three == 6){
                    our_card_three = gif.six_black_gif;
                    our_point_three += 6;
        
                }else if(our_card_ran_three == 7){
                    our_card_three = gif.seven_black_gif;
                    our_point_three += 7;
        
                }else if(our_card_ran_three == 8){
                    our_card_three = gif.eight_black_gif;
                    our_point_three += 8;
        
                }else if(our_card_ran_three == 9){
                    our_card_three = gif.nine_black_gif;
                    our_point_three += 9;
        
                }else if(our_card_ran_three == 10){
                    our_card_three = gif.ten_black_gif;
                    our_point_three += 0;
        
                }else if(our_card_ran_three == 11){
                    our_card_three = gif.j_black_gif;
                    our_point_three += 1;
        
                }else if(our_card_ran_three == 12){
                    our_card_three = gif.q_black_gif;
                    our_point_three += 2;
        
                }else if(our_card_ran_three == 13){
                    our_card_three = gif.k_black_gif;
                    our_point_three += 3;
        
                }
            }

            let sym = '`';

            let user_point = 0;
            let card_number = 1;
            let card_two = gif.back_card_gif;
            let card_three = gif.back_card_gif;
            let end = false;

            user_point += our_point_one;
            
            const mgs = await message.channel.send({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${gif.card_flip_gif}${gif.back_card_gif}`, `${sym}${user_point%10}${sym}`, `${gif.card_flip_gif}${gif.back_card_gif}${gif.back_card_gif}`, `🎲 ~ game in progress`, user, 'Blue', client)] });
            await sleep(500);
            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${gif.back_card_gif}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${gif.back_card_gif}${gif.back_card_gif}`, `🎲 ~ game in progress`, user, 'Blue', client)] });
            await mgs.react('👊');
            await mgs.react('🛑');

            const filter = (reaction, user) => user.id !== client.user.id;

            const collector = mgs.createReactionCollector({
                filter,
                time: CDT,
            });

            collector.on('end', async () =>{
                await userData.save();
                collector.stop();
            });

            collector.on('collect', async (reaction, Muser) => {
                if (user.bot) return;
                
                if (reaction.message.content === mgs.content && reaction.emoji.name === '👊') {
                    if(Muser.id == user.id){
                        if(end == true) return;

                        const userData = await getUser(user.id);

                        card_number += 1;

                        if(card_number == 2){
                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${gif.back_card_gif}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${gif.card_flip_gif}${card_three}`, `🎲 ~ game in progress`, user, 'Blue', client)] });
                            await sleep(500);
                            card_two = our_card_two;
                            user_point += (our_point_two%10);
                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${gif.back_card_gif}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ game in progress`, user, 'Blue', client)] });
                        }
                        if(card_number == 3){
                            end = true;
                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${gif.back_card_gif}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${gif.card_flip_gif}`, `🎲 ~ game in progress`, user, 'Blue', client)] });
                            await sleep(500);
                            card_three = our_card_three;
                            user_point += (our_point_three%10);
                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${gif.back_card_gif}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ game in progress`, user, 'Blue', client)] });

                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${gif.card_flip_gif}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ game in progress`, user, 'Blue', client)] });
                            await sleep(500);
                            pinpy_point += dealer_point2%10;
                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${card_dealer_number2}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ game in progress`, user, 'Blue', client)] });

                            const pinpy_result = (pinpy_point % 10);
                            const user_result = (user_point % 10);
                            if(user_result > pinpy_result){
                                userData.balance += amount*2;
                                mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}${sym}`, `${card_dealer_number}${card_dealer_number2}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ You won! ${amount.toLocaleString()}$`, user, 'Green', client)] });
                                await userData.save();
                                return;
                            }else if(user_result == pinpy_result){
                                userData.balance += amount;
                                mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}${sym}`, `${card_dealer_number}${card_dealer_number2}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ You tied!`, user, 'White', client)] });
                                await userData.save();
                                return;
                            }else{
                                mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}${sym}`, `${card_dealer_number}${card_dealer_number2}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ You lose!`, user, 'Red', client)] });
                                await userData.save();
                                return;
                            }
                        }
                    }
                }

                if (reaction.message.content === mgs.content && reaction.emoji.name === '🛑') {
                    if(Muser.id == user.id){
                        if(end == true) return;
                        end = true;
                        mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${gif.card_flip_gif}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ game in progress`, user, 'Blue', client)] });
                        await sleep(500);
                        pinpy_point += (dealer_point2%10);
                        mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}+?${sym}`, `${card_dealer_number}${card_dealer_number2}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ game in progress`, user, 'Blue', client)] });

                        const pinpy_result = (pinpy_point % 10);
                        const user_result = (user_point % 10);
                        if(user_result > pinpy_result){
                            userData.balance += amount*2;
                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}${sym}`, `${card_dealer_number}${card_dealer_number2}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ You won! ${amount.toLocaleString()}$`, user, 'Green', client)] });
                            await userData.save();
                            return;
                        }else if(user_result == pinpy_result){
                            userData.balance += amount;
                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}${sym}`, `${card_dealer_number}${card_dealer_number2}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ You tied!`, user, 'White', client)] });
                            await userData.save();
                            return;
                        }else{
                            mgs.edit({ embeds: [blackjackEmbed(amount.toLocaleString(), `${sym}${pinpy_point%10}${sym}`, `${card_dealer_number}${card_dealer_number2}`, `${sym}${user_point%10}${sym}`, `${our_card_one}${card_two}${card_three}`, `🎲 ~ You lose!`, user, 'Red', client)] });
                            await userData.save();
                            return;
                        }
                    }
                }
            });
            return;
        }catch(error){
            console.log(`blackjack error ${error}`);
        }
    },
};