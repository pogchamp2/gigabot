const wait = require('node:timers/promises').setTimeout;

const count = async (inter: any, cli: any) => {
    await inter.reply({ content: "start count", ephemeral: true });
    await wait(500);
    for(let x: number = 1;x<=inter.options.getInteger("amount");x++){
      await inter.editReply({ content: x.toString(), ephemeral: true });
      await wait(1000);
    }
    await inter.editReply({ content: "done", ephemeral: true });
}

export { count };