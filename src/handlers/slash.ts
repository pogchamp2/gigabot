import { bank } from "./slash_handlers/bank";
import { count } from "./slash_handlers/count";
const wait = require('node:timers/promises').setTimeout;
const handle = async (inter: any, cli: any) => {
  if (inter.commandName === "ping") {await inter.reply({ content: "pong™:bangbang:", ephemeral: true });}
  if (inter.commandName === "count") {count(inter,cli);}
  if (inter.commandName === "bank") {bank(inter,cli);}
};

export { handle };
