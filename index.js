const { CHANNEL, SERVER, STATUS, LIVE } = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');
const TOKEN = process.env.token // Prevents people from stealing your token
client.on('ready', async () => {
  client.user.setActivity(STATUS + " 😎")
  let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)

  if(!channel) return;
  const connection = await channel.join();
  connection.play(ytdl(LIVE))
})

setInterval(async function() {
  if(!client.voice.connections.get(SERVER)) {
    let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)
    if(!channel) return;

    const connection = await channel.join()
    connection.play(ytdl(LIVE))
  }
}, 20000)

client.login(TOKEN)
