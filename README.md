# Discord bot skeleton

This is a basic skeleton for a Discord bot using [discordjs](https://discord.js.org/#/), following the [discordjs guide](https://discordjs.guide/#before-you-begin).
This skeleton implements event and command handlers.

## Development

- Clone this repository.
- Set the local environment variable `DISCORD_TOKEN` to your Discord bot token (or set `token` in `config.json`).
- `npm install`.
- `node index.js`.

## Code structure

### Config

The bot can be configured via ``config/bot.js``. The default command prefix is "!". 

### Events

So the idea is that under the events folder, there is a folder for each kind of event. The index.js in that folder handles the event, and the other files are individual pieces of functionality so you would make a new file under messages and then call it from index.js

#### Messages

messages/index.js is divided into messages that are commands (have a prefix) and don't

## Commands and features

Commands are determined by bot.json
We use 'something'-command.js to name commands

 - "!" to call bot commands.

If it detects a "!" then it knows the message was a command, and returns the message split up into it's command phrase (e.g. args-info) and any arguments that came after the command phrase (e.g. for !args-info 1 2) it would return 1 and 2 as two args

The ! is a prefix set via config from config/bot.js and those things are under "message" because they are related to the `message` event if we were responding to say, the `isTyping` event, there would be a folder called `isTyping` instead it takes the name of the folder, and uses that to attach the index.js in that folder to the event

### Commands

 - args-info-command
 
### Features

 - 
 
### How to shut it down

 - "*CTRL*"+"C" to shut down the bot through terminal

### Coming soon

 - BRB timers

 - Custom reponses
