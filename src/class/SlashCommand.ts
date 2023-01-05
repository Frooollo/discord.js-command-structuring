import {
  Client,
  ChatInputCommandInteraction,
  ChatInputApplicationCommandData,
} from "discord.js";

interface RunFunctionOptions {
  client: Client;
  interaction: ChatInputCommandInteraction;
}

type RunFunction = (options: RunFunctionOptions) => any;

type SlashCommandData = {
  customData?: { [key: string]: any };
  run: RunFunction;
} & ChatInputApplicationCommandData;

export class SlashCommand {
  constructor(slashCommandData: SlashCommandData) {
    Object.assign(this, slashCommandData);
  }
}
