module.exports = {
    name: 'args-info',
    type: 'command',
    aliases: ['example'],
    description: 'Information about the arguments provided.',
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