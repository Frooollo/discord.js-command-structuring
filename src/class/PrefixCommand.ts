import { Client, Message } from "discord.js";

interface RunFunctionOptions {
  client: Client;
  message: Message;
  args: Array<string>;
}

type RunFunction = (options: RunFunctionOptions) => any;

interface MessageData {
  name: string;
  aliases?: Array<string>;
  description?: string;
  customData?: { [key: string]: any };
}

type PrefixCommandData = {
  run: RunFunction;
} & MessageData;

export class PrefixCommand {
  constructor(prefixCommandData: PrefixCommandData) {
    Object.assign(this, prefixCommandData);
  }
}
