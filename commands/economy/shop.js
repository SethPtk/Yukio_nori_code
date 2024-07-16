const { SimpleEmbed, gif, sym, cooldown, getUser, toSuperscript } = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 9_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'shop',
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

            if(args[0]){
                if(args[0] == 'Ticket' || args[0] == 'ticket'){

                    const ticket_price = 200

                    let messageTicket = '';

                    messageTicket += '`ID: 11`' + `(${gif['014']}) Price: ${gif.gold_coin} **100**\n`;
                    messageTicket += '`ID: 12`' + `(${gif['jjk']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 13`' + `(${gif['op']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 14`' + `(${gif['opm']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 15`' + `(${gif['ds']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 16`' + `(${gif['cg']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 17`' + `(${gif['nt']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 18`' + `(${gif['nm']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 19`' + `(${gif['ms']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 20`' + `(${gif['cm']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;
                    messageTicket += '`ID: 21`' + `(${gif['kn8']}) Price: ${gif.gold_coin} **${ticket_price}**\n`;

                    message.channel.send({embeds: [SimpleEmbed(messageTicket)
                        .setAuthor({ name: `${client.user.displayName}`, iconURL: client.user.displayAvatarURL()})
                        .setTitle('===========Shop===========')
                        .setTimestamp()
                    ]});

                return
                }
            }

            const pickage_price = 100000;
            const box_price = 50000;
            const egg_price = 5000000;
            const box_weapon_price = 1000000;
            const holder_item_price = 10000000;
            const wcl_price = 200;
            const wcf_price = 250;
            const lb_price = 50;
            const wc_price = 50;
            const premium_price = 200;

            message.channel.send({embeds: [SimpleEmbed('`ID: 01`' + `(${gif.pickage_gif}${toSuperscript(1, 1)}) Price: ${gif.cash} **${pickage_price.toLocaleString()}**\n` + '`ID: 02`' + `(${gif.box_gif}${toSuperscript(1, 1)}) Price: ${gif.cash} **${box_price.toLocaleString()}**\n` + '`ID: 03`' + `(${gif.egg_gif}${toSuperscript(1, 1)}) Price: ${gif.cash} **${egg_price.toLocaleString()}**\n` + '`ID: 04`' + `(${gif.box_weapon_gif}${toSuperscript(1, 1)}) Price: ${gif.cash} **${box_weapon_price.toLocaleString()}**\n` + '`ID: 05`' + `(${gif.holder_item_gif}${toSuperscript(1, 1)}) Price: ${gif.cash} **${holder_item_price.toLocaleString()}**\n` + '`ID: 06`' + `(${gif['777']}${toSuperscript(1, 1)}) Price: ${gif.gold_coin} **${wcl_price}**\n` + '`ID: 07`' + `(${gif['999']}${toSuperscript(1, 1)}) Price: ${gif.gold_coin} **${wcf_price}**\n` + '`ID: 08`' + `(${gif.premium_yukio}${toSuperscript(1, 1)}) Price: ${gif.gold_coin} **${premium_price}**\n` + '`ID: 09`' + `(${gif['050']}${toSuperscript(50, 50)}) Price: ${gif.gold_coin} **${lb_price}**\n` + '`ID: 10`' + `(${gif['100']}${toSuperscript(50, 50)}) Price: ${gif.gold_coin} **${wc_price}**`)
            .setAuthor({ name: `${client.user.displayName}`, iconURL: client.user.displayAvatarURL()})
            .setTitle('===========Shop===========')
            .setTimestamp()
        ]});
            return;
        }catch(error){
            console.log(`shop error ${error}`);
        }
    },
};