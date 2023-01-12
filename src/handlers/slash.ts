const handle = async (inter: any, cli: any) => {
  if (inter.name === "ping") {
    await inter.reply("pong™:bangbang:");
  }
};

export { handle };
