import { get } from "../../http";

const test = async (inter: any, cli: any) => {
    if(inter.user.id != 331196145630052355 && inter.user.id != 254112318089068545){
        await inter.reply({ content: "You cannot use the test command, as you are not a developer of this bot.", ephemeral: true})
    }
    else{
    let testType: String = inter.options.getString("test")
    if(testType == "id"){
        await inter.reply({ content: inter.user.id.toString(), ephemeral: true})
    }
    if(testType == "http"){
        await inter.reply({ content: (await get("http://66.42.73.191:8080/")).data.toString(), ephemeral: true})
    }
    }
}

export { test };