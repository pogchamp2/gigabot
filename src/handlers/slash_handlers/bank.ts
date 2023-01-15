//@UnixPNG => I don't think we'll need this but I'm keeping the
//line in case we need it
////const wait = require('node:timers/promises').setTimeout;

//TODO: @UnixPNG, add auth for 'link'
var fs = require("fs");
import { get } from "../../http";
var users: { [key: string]: any } = {};
try {
    fs.readFile("./usersBank.json","utf-8", (err: any, data: any) => {
        console.log(data)
        console.error(err)
        if(data)users = JSON.parse(data)
    });
} catch (err: any){
    console.error(err)
}

//http://66.42.73.191:8080/bank/get?user=UnixTM&json=true
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
      message = "valid actions for bank:\nname - reply with your linked user\nlink <user> - link that user to your discord user\nget - get your bank balance\nsend <amount> <to> - send $<amount> money™ to <to>";
    }

    else if(action === "send"){
        let id: string = inter.user.id.toString();
        let namez: string = users[id];
        let to: string = inter.options.getString("to");
        let money: number = inter.options.getInteger("amount");
        let cantAfford: any = {"status":"not enough"}
        let err: string = "error"
        if(namez !== undefined){
            var sent: any = await get("http://66.42.73.191:8080/bank/transfer?from="+namez+"&amount="+money.toString()+"&to="+to);
            if(sent == cantAfford){
                message = "you cant send that much, you dont have that much"
            }
            else if(sent == err){
                message = "sorry there was an error try again later"
            }
            else{
            var result: any = await get("http://66.42.73.191:8080/bank/get?user="+namez);
            console.log(result);
            message = "you (`"+namez+"`) now have `$"+result.toString()+"` money™.";
            }
        }
        else{
            if(to == undefined){
                if(money == undefined){
                    message = "link an account, say who its for, and say how much"
                }
                message = "you need to link an account AND say who you are sending it to"
            }
            if(money == undefined && to != undefined){
                message = "link an account, and say how much"
            }
            message = "uh you didnt link your account";
        }
    }

    else if(action === "get"){
        let id: string = inter.user.id.toString();
        let namez: string = users[id];
        if(namez !== undefined){
            var result: any = await get("http://66.42.73.191:8080/bank/get?user="+namez);
            console.log(result);
            message = "you (`"+namez+"`) have `$"+result.toString()+"` money™.";
        }
        else{
            message = "uh you didnt link your account";
        }
    }

    else if(action === "name"){
        let id: string = inter.user.id.toString();
        try{
            let namez: string = users[id];
            if(namez !== undefined){message = "youre `"+namez+"`! cool!";}
            else{message = "you didnt link your account"}
        }
        catch{
            message = "you didnt link your account";
        }
    }

    else if(action === "unlink"){
        let id: string = inter.user.id as string;
        let name: string = users[id];
        users[id] = undefined;
        try {
            fs.writeFile('./usersBank.json', JSON.stringify(users), (err: any) => {
                console.error(err)
            });
        } catch (err: any){
            console.error(err)
        }
        message = "ok youre no longer linked to `"+name+"`";
    }

    else if(action === "link"){
      let user: string = inter.options.getString("user");
      if(user === "" || user === null || user === undefined){message = "You must provide a user.";}
      else {
        let id: string = inter.user.id as string;
        let namez: string = users[id];
        //if(namez !== undefined){message = "you already linked an account"}
        //else{
        users = Object.assign({[id]: user},users);
        console.log(users);
        message = "ok bro ur now linked to `"+user+"`";
        try {
            fs.writeFile('./usersBank.json', JSON.stringify(users), (err: any) => {
                console.error(err)
            });
        } catch (err: any){
            console.error(err)
        }
        //}
      }
    }
    else{message = "Invalid action"}
    message ??= "there was an issue"

    await inter.reply({ content: message, ephemeral: true });
}
export { bank };