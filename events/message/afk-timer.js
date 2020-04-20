module.exports = {
    name: 'afk-timer',
    type: 'non-command',
    description: 'Begins an away timer when specific strings are detected within a message. Stops timer and posts result when the same user posts another message',
	execute(client, message) {
        // Checks if user on away list has returned
        if (client.cache.get('away-list')) {
            if (client.cache.get('away-list').includes(message.author.id)) {
                message.channel.send(`${message.author} is back, yay!`);

                client.cache.set('away-list', client.cache.get('away-list').filter(user => !user.includes(message.author.id)));
            }
        }

        // Checks if user has gone afk
		if (message.content.includes('brb')) {            
            message.channel.send(`${message.author} is away, boo!`);

            let currentAwayList = [message.author.id];

            if (client.cache.get('away-list')) {
                client.cache.get('away-list').forEach ( user => {
                    currentAwayList.unshift(user);
                });
            }        
            client.cache.set('away-list', currentAwayList);  
        }
	},
};