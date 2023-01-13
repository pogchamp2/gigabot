//@UnixPNG => I don't think we'll need this but I'm keeping the
//line in case we need it
////const wait = require('node:timers/promises').setTimeout;
import { get } from "../../http";
//http://66.42.73.191:8080/bank/get?user=UnixTM
//, names: Object
const bank = async (inter: any, cli: any) => {
    let message: string = "";
    let action: string = inter.options.getString("action");
    /* */
    /*
    valid actions for bank:
    link <username> - link that user to your discord user
    */
    if(action === "help"){
      message = "valid actions for bank:\nname - reply with your linked user\nlink <user> - link that user to your discord user";
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
export { bank };