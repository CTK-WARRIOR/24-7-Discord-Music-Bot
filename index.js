const { TOKEN, CHANNEL, SERVER, STATUS, LIVE } = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');
var broadcast = null;
var interval = null;

client.on('ready', async () => {
  client.user.setActivity(STATUS + " 😎")
  let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)

  broadcast = bot.voice.createBroadcast();
  // Play the radio
  broadcast.play(await ytdl(LIVE));
  // Make interval so radio will automatically recommect to YT every 30 minute because YT will change the raw url every 30m/1 Hour
  if (!interval) interval = setInterval(broadcast.play, 1800000, ytdl(LIVE));

  if(!channel) return;
  const connection = await channel.join();
  connection.play(broadcast)
})

setInterval(async function() {
  if(!client.voice.connections.get(SERVER)) {
    let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)
    if(!channel) return;

    const connection = await channel.join()
    connection.play(broadcast)
  }
}, 20000)

client.login(TOKEN) //Login
