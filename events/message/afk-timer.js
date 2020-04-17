module.exports = {
    name: 'afk-timer',
    aliases: ['example'],
    description: 'Begins an away timer. Stops timer and posts result when user posts another message',
    guildOnly: false,
    cooldown: 5,
    args: true,
    usage: '<arg1> <arg2>',
	execute(message, args) {
		if (args[0] === 'foo'){
            return message.channel.send('bar');
        }

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};