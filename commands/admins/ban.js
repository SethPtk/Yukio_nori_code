const fs = require('fs');
const { getUser } = require('../../functioon/function');

module.exports = {
    name: 'blacklist',
    async execute(client, message, args) {
        try {
            
            const userId = args[0];
            const reason = message.content.slice(`ban ${userId}` .length);
            
            try{
                const user = await client.users.fetch(userId);
                await user.send(`You has been BAN!, SAFID: ${reason}`); 
            }catch(error){}
    
            if(userId == '1155362022146457671'){
                return message.reply('can not ban this user!.');
            }

            const banlist = loadBanlist();
            if (banlist.includes(userId)) {
                return message.reply('This user is already banned.');
            }

            banlist.push(userId);
            saveBanlist(banlist);

            message.channel.send(`User has been blacklist form bot.`);
        } catch (error) {
            console.error('Error banning user:', error);
            message.reply('Failed to ban user.');
        }
    },
};

function loadBanlist() {
    try {
        const data = fs.readFileSync('./banlist.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading banlist:', error);
        return [];
    }
}

function saveBanlist(banlist) {
    try {
        fs.writeFile('./banlist.json', JSON.stringify(banlist), (err) => {
            if (err) {
                console.error('Error saving banlist:', err);
            }
        });
    } catch (error) {
        console.error('Error saving banlist:', error);
    }
}
