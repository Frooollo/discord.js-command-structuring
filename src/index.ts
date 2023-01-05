import { version } from "discord.js";
import { PrefixCommand } from "./class/PrefixCommand";
import { SlashCommand } from "./class/SlashCommand";

if (version.split(".")[0] !== "14") {
  console.error(
    `[discord.js-command-structuring] The version 1.x.x of discord.js-command-structuring isn't compatible with discord.js version 13.5.4`
  );
  process.exit(1);
}

export { PrefixCommand, SlashCommand };
