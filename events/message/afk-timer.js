module.exports = {
    name: 'afk-timer-nc',
    aliases: ['example'],
    description: 'Begins an away timer when specific strings are detected within a message. Stops timer and posts result when the same user posts another message',
    guildOnly: false,
	execute(client, message) {
        if (message.author.id == client.cache.get("away-list")) {
            message.channel.send(`${message.author} is back, yay!`);
            client.cache.del("away-list"); 
        }

		if (message.content.includes('brb')) {            
            message.channel.send(`${message.author} is away, boo!`);
            client.cache.set("away-list", message.author.id);        
        }
	},
};