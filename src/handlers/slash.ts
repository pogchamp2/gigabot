import { CommandInteraction } from "discord.js";
const wait = require('node:timers/promises').setTimeout;
//http://66.42.73.191:8080/bank/get?user=UnixTM
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
    await inter.editReply({ content: "done", ephemeral: true });
  }
  if (inter.commandName === "bank") {
    let message: string = "";
    let action: string = inter.options.getString("action");
    /* */
    /*
    valid actions for bank:
    link <username> - link that user to your discord user
    */
    if(action === "help"){
      message = "valid actions for bank:\nlink <user> - link that user to your discord user";
    }
    if(action === "link"){
      let user: string = inter.options.getString("user");
      if(user === ""){message == "You must provide a user."}
      //TODO: @UnixPNG or @stephenfjohnson, keep an map of linked users to minecraft names (next line)
      //and save and load it to and from a file and do actions as the correct user.
      //TODO: @UnixPNG add the {send,get} actions and a method to send http rerquests
    }

    await inter.reply({ content: message, ephemeral: true });
  }
};

export { handle };
