async function handle(inter,cli) {
    if(inter.name === 'ping'){
        await inter.reply('pong™:bangbang:')
    }
}

export default handle