const Discord = require('discord.js');

module.exports = {
    name: 'message',
    description: 'On new message',
	execute(client, message) {
        // Check for prefix 

        console.log("New message handler");
        
        try {
            const isCommand = isMessageCommand(client, message);
            //console.log(isCommand);
            if (isCommand.prefix){
                handleCommand(client, message, isCommand.command, isCommand.args);
            } else {
                handleNonCommand(client, message);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
};

function recordMessage(client, message){};

function isMessageCommand(client, message){

    let prefix = null;
    if (message.content.startsWith(client.config.prefix) && !message.author.bot) {
        // Return message split into command and arguments
        prefix = client.config.prefix;
        const args = message.content.slice(client.config.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        const eventActions = client.eventActions.get('message');

        const command = eventActions.get(commandName)
            || eventActions.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) throw "Command not recognised"; else return {prefix, command, args};
    } else {
        // Return message untouched
        return {prefix, message};
    }
}

function handleCommand(client, message, command, args){

    console.log("Command: "+command+" "+args);
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length){
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!client.cooldowns.has(command.name)){
        client.cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error){
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }   


}

function handleNonCommand(client, message){

    if (message.author.bot){
        // Handle bot messages        
        console.log("Non command - bot");
    } else {
        // Handle user non command messages  
        console.log("Non command - user");

        const eventActions = client.eventActions.get('message');        

        eventActions.forEach( action => { 
            if (action.type == 'non-command') {
                console.log('execute');
                try {
                    action.execute(client,message);
                } catch (error){
                    console.error(error);
                    message.reply('there was an error trying to execute that non command!');
                } 

            } else {
                // Skip command action
            }
        });
    }
}