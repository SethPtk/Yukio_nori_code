const mongoose = require('mongoose');
const { Client, IntentsBitField, ActivityType } = require('discord.js');
require('dotenv').config();
const { detectMessage } = require('./msc/Handler/detectMessage');
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ],
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS
});

client.cluster = new ClusterClient(client);

const { initializeUserIds } = require('./msc/Handler/userManage');

detectMessage(client);

(async () =>{

    try{
        await mongoose.connect(process.env.DB);
        
        console.log("Connect to DB");

        initializeUserIds().then(() => {});

    }catch(error){
        console.log(`Error nv index.js Error: ${error}`);
    }
})();

client.on('ready', async () =>{
    console.log(`${client.user.tag} is online!`);
    client.user.setPresence({
        status: 'idle',

        activities: [{
            type: ActivityType.Streaming,
            name: '$bankrob',
        }]
    });
});

client.on('error', error => {
    console.error('A Discord client error occurred:', error);
});

client.login(process.env.TOKEN)
