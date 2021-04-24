const { TOKEN, CHANNEL, SERVER, STATUS, LIVE } = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');
var broadcast = null;
var interval = null;

client.on('ready', async () => {
  client.user.setActivity(STATUS || "Radio")
  let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)

  broadcast = client.voice.createBroadcast();
  // Play the radio
  stream = await ytdl(LIVE);
  stream.on('error', console.error);
  broadcast.play(stream);
  // Make interval so radio will automatically reconnect to YT every 30 minute because YT will change the raw url every 30m/1 Hour
  if (!interval) {
    interval = setInterval(async function() {
      try {
       stream = await ytdl(LIVE, { highWaterMark: 100 << 150 });
       stream.on('error', console.error);
       broadcast.play(stream);
      } catch (e) { return }
    }, 1800000)
  }
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

process.on('unhandleRejection', console.error);
