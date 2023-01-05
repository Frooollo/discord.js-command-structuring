# discord.js-command-structuring

An NPM package that makes it easier to use a discord.js handler

## Getting started

- Install the package

```
npm install discord.js-command-structuring
```

- Use the class SlashCommand

**WARNING**: This class only works with handlers that use the run function with the parameters inside an object

```js
const { SlashCommand } = require("discord.js-command-structuring");

module.exports = new SlashCommand({
  name: "ping",
  description: "Get the ping of the bot",
  run: async ({ client, interaction }) => {
    await interaction.reply({
      content: `The ping is ${client.ws.ping}ms`,
    });
  },
});
```

## SlashCommand class optionals options

| **Option name** | **Option type** | **Description**           |
| --------------- | --------------- | ------------------------- |
| customData      | _Object_        | Custom slash command data |

- Use the class PrefixCommand

**WARNING**: This class only works with handlers that use the run function with the parameters inside an object

```js
const { PrefixCommand } = require("discord.js-command-structuring");

module.exports = new PrefixCommand({
  name: "say",
  description: "Repeat a sentence",
  run: async ({ client, message, args }) => {
    await message.channel.send({
      content: args.join(" "),
    });
  },
});
```

## PrefixCommand class optionals options

| **Option name** | **Option type** | **Description**            | **Optional?** |
| --------------- | --------------- | -------------------------- | ------------- |
| name            | _String_        | Prefix command name        | No            |
| aliases         | _String[]_      | Prefix command aliases     | Yes           |
| description     | _String_        | Prefix command description | Yes           |
| customData      | _Object_        | Custom prefix command data | Yes           |

### Examples

#### Slash Commands Handler

```js
// interactionCreate event

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== 2) return;

  const command = client.commands.get(interaction.commandName);

  if (
    !command ||
    command.customData.blacklistedUsers.includes(interaction.user.id)
  )
    return;

  command.run({ client, interaction });
});

// Slash command file

const { SlashCommand } = require("discord.js-command-structuring");

module.exports = new SlashCommand({
  name: "ping",
  description: "Get the ping of the bot",
  customData: {
    blacklistedUsers: [],
  },
  run: async ({ client, interaction }) => {
    await interaction.reply({
      content: `The ping is ${client.ws.ping}ms`,
    });
  },
});
```

#### Prefix Commands Handler

```js
// messageCreate event

client.on("messageCreate", async (message) => {
  const prefix = "!";

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/),
    commandName = args.shift().toLowerCase();

  if (
    !client.commands.has(commandName) &&
    !client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    )
  )
    return;

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (
    command.customData.blacklistedUsers &&
    command.customData.blacklistedUsers.includes(message.author.id)
  )
    return;

  command.run({ client, message, args });
});

// Prefix command file

const { PrefixCommand } = require("discord.js-command-structuring");

module.exports = new PrefixCommand({
  name: "say",
  aliases: ["echo"],
  description: "Repeat a sentence",
  customData: {
    blacklistedUsers: [],
  },
  run: async ({ message, args }) => {
    await message.channel.send({
      content: args.join(" "),
    });
  },
});
```
