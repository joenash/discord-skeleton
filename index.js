require('dotenv').config()

const fs = require('fs');

const NodeCache = require("node-cache");
const botCache = new NodeCache();

const config = require('./config/bot.json');

const Discord = require('discord.js');

const client = new Discord.Client();
client.cache = botCache;
client.config = config;
client.config.token = process.env.DISCORD_TOKEN;
client.eventActions = new Discord.Collection;

const db = require('./models/index.js');

db.sequelize.authenticate().then(() => {
    console.log('DB ok');
}).catch(err => {
    console.error('DB error');
});

client.db = db;

const init = async () => {

    client.cooldowns = new Discord.Collection();

    fs.readdir("./events", { withFileTypes:true }, (err, files) => {

        const eventDirs = files.filter(file => file.isDirectory());

        const eventFiles = files.filter(file => !file.isDirectory() && file.name.endsWith(".js"));

        eventFiles.forEach( file => {
            const event = require(`./events/${file.name}`);
            client.on(event.name, event.execute.bind(null, client));
        
        });
        
        eventDirs.forEach( eventDir => {
            let eventActions = new Discord.Collection;
            fs.readdir(`./events/${eventDir.name}`, (err, files) => {
                const eventIndex = files.filter(file => file === "index.js");
                if (!eventIndex.length) return;
                const eventEntry = require(`./events/${eventDir.name}/index.js`);

                const handlerFiles = files.filter(file => file.endsWith('js') && file != "index.js");
                handlerFiles.forEach( file =>{
                    const action = require(`./events/${eventDir.name}/${file}`);
                    eventActions.set(action.name, action);
                })
                
                client.eventActions.set(eventDir.name, eventActions);
                client.on(eventDir.name, eventEntry.execute.bind(null, client));
            });
            
        });
        
    });
    
client.login(config.token);
client.once('ready', () => {
    console.log('Ready!');
});

}

process.on('SIGINT', () => {
    client.destroy();
});

process.on('SIGTERM', () => {
    client.destroy();
});


init();

