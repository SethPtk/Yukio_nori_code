const {getUser, gif, AttachmentBuilder, createCanvas, loadImage, cooldown} = require('../../functioon/function');

const cooldowns = new Map();
let CDT = 5_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'rank',
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
            
            const canvas = createCanvas(1243, 374);
            const ctx = canvas.getContext('2d');

            let backgroundImage = gif.backgroundImage;

            if(userData.lvl_bg == 'jjk'){
                backgroundImage = gif.jjk_bg;
            }else if(userData.lvl_bg == 'op'){
                backgroundImage = gif.op_bg;
            }else if(userData.lvl_bg == 'opm'){
                backgroundImage = gif.opm_bg;
            }else if(userData.lvl_bg == 'ds'){
                backgroundImage = gif.ds_bg
            }else if(userData.lvl_bg == 'cg'){
                backgroundImage = gif.cg_bg;
            }else if(userData.lvl_bg == 'nt'){
                backgroundImage = gif.nt_bg;
            }else if(userData.lvl_bg == 'nm'){
                backgroundImage = gif.nm_bg;
            }else if(userData.lvl_bg == 'ms'){
                backgroundImage = gif.ms_bg;
            }else if(userData.lvl_bg == 'cm'){
                backgroundImage = gif.cm_bg;
            }else if(userData.lvl_bg == 'kof'){
                backgroundImage = gif.kof_bg;
            }else if(userData.lvl_bg == 'kn8'){
                backgroundImage = gif.kn8_bg;
            }

            const background = await loadImage(backgroundImage);
            ctx.drawImage(background,0, 0, canvas.width, canvas.height);

            const elo = parseInt(userData.elo);

            ctx.fillStyle = '#ffffff';
            ctx.font = '80px Arial';
            ctx.fillText(`elo: ${elo.toLocaleString()}`, 400, 220);

            let rankIamge = gif.mental_rank_gif;
            let rankName = 'Mental';
            let color = '#9e9e9e';

            if(userData.elo >= 500000){
                rankIamge = gif.vainglorious_rank_gif;
                rankName = 'Vainglorious';
                color = '#00dbf9';
            }else if(userData.elo >= 100000){
                rankIamge = gif.ace_rank_gif;
                rankName = 'Ace';
                color = '#fd00e9';
            }else if(userData.elo >= 50000){
                rankIamge = gif.gem_rank_gif;
                rankName = 'Gem';
                color = '#00fc68';
            }else if(userData.elo >= 10000){
                rankIamge = gif.penta_rank_gif;
                rankName = 'Penta';
                color = '#0089f8';
            }else if(userData.elo >= 5000){
                rankIamge = gif.either_rank_gif;
                rankName = 'Either';
                color = '#f2d000';
            }

            const rank = await loadImage(rankIamge);
            ctx.drawImage(rank, 50, 40, 300, 300);
            ctx.fillStyle = color;
            ctx.fillText(`${rankName}`, 400, 120);

            ctx.fillStyle = color;

            ctx.fillRect(0, 0, 30, 374);
            ctx.fillRect(1213, 0, 30, 374);

            ctx.fillRect(0, 0, 1243, 30);
            ctx.fillRect(0, 344, 1243, 30);

            const attachment = new AttachmentBuilder(canvas.toBuffer());
            message.channel.send({ files: [attachment] });
        }catch(error){
            console.log(`rank error ${error}`);
        }
    },
};