import { get } from "../../http";

const test = async (inter: any, cli: any) => {
  if (
    inter.user.id != 331196145630052355n &&
    inter.user.id != 254112318089068545n
  ) {
    await inter.reply({
      content:
        "You cannot use the test command, as you are not a developer of this bot.",
      ephemeral: true,
    });
  } else {
    let testType: String = inter.options.getString("test");
    if (testType == "id") {
      await inter.reply({ content: inter.user.id.toString(), ephemeral: true });
    }

    // const obj = JSON.stringify(content);

    // const entries = Object.entries(content);

    // for await (const [key, value] of Object.entries(content)) {
    //   str.concat(`${key}: ${value}`);
    // }

    if (testType == "http") {
      const func = async () => {
        const content = await get("http://66.42.73.191:8080/");
        let str = "";
        for (const [key, value] of Object.entries(content)) {
          str = str.concat(`${key}: ${value}\n`);
        }
        return str;
      };

      const main = async () => {
        const result = await func();
        await inter.reply({
          content: result,
          ephemeral: true,
        });
      };
      main();
    }
    if (testType == "slash") {
      await inter.reply({ content: "ok", ephemeral: true });
      inter.channel.send("/test test:bot");
    }
    if (testType == "bot") {
      await inter.reply({ content: "sending the test message", ephemeral: true});
      inter.channel.send("test message");
    }
  }
};

export { test };
