import { CommandInteraction } from "discord.js";
const wait = require('node:timers/promises').setTimeout;

const handle = async (inter: any, cli: any) => {
  if (inter.commandName === "ping") {
    inter.ephemeral = true;
    await inter.reply({ content: "pong™:bangbang:", ephemeral: true });
  }
  if (inter.commandName === "count") {
    await inter.reply({ content: "start count", ephemeral: true });
    await wait(500);
    for(let x: number = 1;x<=inter.options.getInteger("amount");x++){
      await inter.editReply({ content: x.toString(), ephemeral: true });
      await wait(1000);
    }
  }
};

export { handle };
