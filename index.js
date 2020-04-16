require('dotenv').config()

const fs = require('fs');

const NodeCache = require("node-cache");
const botCache = new NodeCache();

const config = require('./config/config.json')["bot"];

const Discord = require('discord.js');

const client = new Discord.Client();
client.cache = botCache;
client.config = config;
client.config.token = process.env.DISCORD_TOKEN;
client.commands = new Discord.Collection;

const db = require('./models/index.js');

db.sequelize.authenticate().then(() => {
    console.log('DB ok');
}).catch(err => {
    console.error('DB error');
});

const init = async () => {

    client.cooldowns = new Discord.Collection();

    fs.readdir("./commands", (err, files) => {
        const commandFiles = files.filter(file => file.endsWith('.js'));
        commandFiles.forEach( file => {
            const command = require(`./commands/${file}`);
            client.commands.set(command.name, command);
        });
    });

    fs.readdir("./events", (err, files) => {
        const eventFiles = files.filter(file => file.endsWith('.js'));
        eventFiles.forEach( file => {
            const event = require(`./events/${file}`);
            client.on(event.name, event.execute.bind(null, client));
        })
    });
    
client.login(config.token);
client.once('ready', () => {
    console.log('Ready!');
});

}

init();

