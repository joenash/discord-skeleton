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

To add a new event handler, create a directory within ``events`` named after the event you want to catch (full list within the DiscordJS [Client object](https://discord.js.org/#/docs/main/stable/class/Client)). Every handler must have an ``index.js`` that acts as the entry point to the event. See the existing handler for ``messages`` for an example.

#### Messages

As most Discord bots are reply/response, or execute commands, a default message handler is included. ``messages/index.js`` detects commands with the configured prefix, and parses arguments. It also supports reacting to non-command message events, for i.e. logging or reply/response. 

## Commands and features

To create a command, export a property ``type: 'command'``. The bot will check that a message has both the configured prefix, and the correct ``type`` property before executing a command.


If the bot detects a valid command, it returns the message split up into it's command phrase (e.g. args-info) and any arguments that came after the command phrase (e.g. for !args-info 1 2) it would return 1 and 2 as two args

Commands are assumed to be executed in response to user messages, and so are handled by the ``messages`` handler. To add handlers for other events, see [Events](###Events).

### Commands
Below is a list of commands provided by default. Want to add a command? Pull requests welcome ✨.
 - args-info-command
 
### Features

 - 
 
### How to shut it down

 - "*CTRL*"+"C" to shut down the bot through terminal

### Coming soon

 - BRB timers

 - Custom reponses
