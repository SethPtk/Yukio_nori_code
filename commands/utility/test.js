const {cooldown, gif, AttachmentBuilder, SimpleEmbed, User, customEmbed, getUser, ButtonStyle, createCanvas, loadImage, labelButton, twoButton, getCollectionButton} = require('../../functioon/function');
const moment = require('moment-timezone');

const cooldowns = new Map();
let CDT = 60_000;
var getId = [];
var cdId = [];
var prem = [];

module.exports = {
    name: 'test',
    async execute(client, message, args) {
        try{
            const user = message.author;

            const width = 480;
            const height = 250;
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            // Load background image
            const backgroundImage = gif.profile_background_premium;
            const background = await loadImage(backgroundImage);
            ctx.drawImage(background, 0, 0, width, height);

            // Load profile images
            const user1AvatarURL = user.displayAvatarURL({ extension: 'png', size: 256 });
            const user2AvatarURL = user.displayAvatarURL({ extension: 'png', size: 256 });

            const user1Avatar = await loadImage(user1AvatarURL);
            const user2Avatar = await loadImage(user2AvatarURL);

            // Define positions and sizes
            const radius = 50;
            const user1X = 100;
            const user2X = 380;
            const y = 60;

            // Draw enhanced profile picture frames with gradient
            const drawGradientCircle = (ctx, x, y, radius, color1, color2) => {
                const gradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius);
                gradient.addColorStop(0, color1);
                gradient.addColorStop(1, color2);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            };

            // Draw first user's profile picture with gradient frame
            drawGradientCircle(ctx, user1X, y, radius + 5, 'gold', 'orange');
            ctx.save();
            ctx.beginPath();
            ctx.arc(user1X, y, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(user1Avatar, user1X - radius, y - radius, radius * 2, radius * 2);
            ctx.restore();

            // Draw second user's profile picture with gradient frame
            drawGradientCircle(ctx, user2X, y, radius + 5, 'gold', 'orange');
            ctx.save();
            ctx.beginPath();
            ctx.arc(user2X, y, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(user2Avatar, user2X - radius, y - radius, radius * 2, radius * 2);
            ctx.restore();

            // User details
            const user1 = {
                username: 'User1',  // Replace with actual user1 username
                level: 'Level 10',
                aboutMe: 'About me text for User1',
                relationshipStatus: 'In a relationship',
                dateOfCouple: '01/01/2020'
            };

            const user2 = {
                username: 'User2',  // Replace with actual user2 username
                level: 'Level 15',
                aboutMe: 'About me text for User2',
                relationshipStatus: 'In a relationship',
                dateOfCouple: '01/01/2020'
            };

            // Draw stylish usernames and levels
            const drawTextWithShadow = (ctx, text, x, y, fontSize, color, shadowColor) => {
                ctx.font = `${fontSize}px Arial`;
                ctx.fillStyle = shadowColor;
                ctx.fillText(text, x + 2, y + 2);
                ctx.fillStyle = color;
                ctx.fillText(text, x, y);
            };

            drawTextWithShadow(ctx, user1.username, user1X, y + radius + 30, 20, 'white', 'black');
            drawTextWithShadow(ctx, user1.level, user1X, y + radius + 50, 18, 'yellow', 'black');
            drawTextWithShadow(ctx, user2.username, user2X, y + radius + 30, 20, 'white', 'black');
            drawTextWithShadow(ctx, user2.level, user2X, y + radius + 50, 18, 'yellow', 'black');

            // Draw about_me, relationship_status, and date_of_couple in the center
            ctx.font = '20px CuteFont'; // Use a cute font
            ctx.fillStyle = 'pink'; // Example color, adjust as needed
            ctx.textAlign = 'center';

            const aboutMeText = `${user1.aboutMe}`;
            const relationshipStatusText = `${user1.relationshipStatus}`;
            const dateOfCoupleText = `Since: ${user1.dateOfCouple}`;

            ctx.fillText(aboutMeText, width / 2, height / 2 - 20);
            ctx.fillText(relationshipStatusText, width / 2, height / 2);
            ctx.fillText(dateOfCoupleText, width / 2, height / 2 + 20);

            // Add decorative elements like borders, icons, or highlights
            // Example: Draw a border around the canvas
            ctx.strokeStyle = 'gold';
            ctx.lineWidth = 10;
            ctx.strokeRect(0, 0, width, height);

            // Save the image to a buffer and send it
            const buffer = canvas.toBuffer('image/png');
            const attachment = new AttachmentBuilder(buffer, { name: 'profile-image.png' });

            message.channel.send({ files: [attachment] });

        }catch(error){ console.log(`superagent error ${error}`); }
    },
};



