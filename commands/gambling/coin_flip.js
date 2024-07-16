const { getUser, getRandomInt, gif, SimpleEmbed, sym, cooldown, sleep } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'cf',
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

            var guess = '';
            var coin = '';

            let bet = args[0];
            let bet_cash = parseInt(args[0]);

            if(!bet){
                return;
            }else if(parseInt(bet)){
                guess = 'head';
                const choice = args[1];
                if(choice == 't'){
                    guess = 'tail';
                }else if(choice == 'h'){
                    guess = 'head';
                }
            }else if(bet == 'all'){
                bet = userData.balance;
                guess = 'head';
                const choice = args[1];
                if(choice == 't'){
                    guess = 'tail';
                }else if(choice == 'h'){
                    guess = 'head';
                }
            }else{
                message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> wrong syntax!`)] });
                return;
            }

            if(guess == 'head'){
                const head = getRandomInt(1, 8);
                if(head <= 3){
                    coin = 'head';
                }else{
                    coin = 'tail'
                }
            }else if(guess == 'tail'){
                const tail = getRandomInt(1, 8);
                if(tail <= 3){
                    coin = 'tail';
                }else{
                    coin = 'head';
                }
            }

            const msg = await message.channel.send({ embeds: [SimpleEmbed(`<@${user.id}> you choose ${guess} and wait...${gif.coin_flip_gif}`)] });
            await sleep(2000);

            if(bet == `${bet_cash}k` || bet == `${bet_cash}K`){
                bet = bet_cash * 1000;
            }

            if(bet >= 250000){
                bet = 250000 
            };

            if(userData.balance < bet || userData.balance <= 0){
                message.reply({ embeds: [SimpleEmbed(`<@${user.id}>** You don't have enough cash!**`)] });
                return;
            }

            userData.balance -= bet;
            try{ await userData.save(); }catch(error){}

            if(guess == coin){
                msg.edit({ embeds: [SimpleEmbed(`<@${user.id}> Coin: ${coin} You won ${gif.cash} **${bet.toLocaleString()}**$ and you chose ${guess}`)] });
                const cash = bet*=2;
                userData.balance += parseInt(cash);   
                try{
                    await userData.save();
                }catch(error){}
                return;        
            }else{
                msg.edit({ embeds: [SimpleEmbed(`<@${user.id}> Coin: ${coin} You lost ${gif.cash} ${bet.toLocaleString()}$ and you chose ${guess}`)] });
                try{
                    await userData.save();
                }catch(error){}
                return;
            }
        }catch(error){
            console.log(`coin flip error ${error}`);
        }
    },
};