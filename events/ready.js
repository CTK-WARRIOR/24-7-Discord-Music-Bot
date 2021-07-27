const { CHANNEL, STATUS, LIVE } = require("../config.json");
const ytdl = require("ytdl-core");
let broadcast = null;
let interval = null;

module.exports = async (client, process) => {
  client.user.setActivity(STATUS || "Radio");
  let channel =
    client.channels.cache.get(CHANNEL) ||
    (await client.channels.fetch(CHANNEL));

  if (!channel) {
    console.error(
      "The provided channel ID doesn't exist, or I don't have permission to view that channel. Because of that, I'm aborting now."
    );
    process.exit(1);
  } else if (channel.type !== "voice") {
    console.error(
      "The provided channel ID is NOT voice channel. Because of that, I'm aborting now."
    );
    process.exit(1);
  }
  broadcast = client.voice.createBroadcast();
  // Play the radio
  stream = ytdl(LIVE);
  stream.on("error", console.error);
  broadcast.play(stream);
  // Make interval so radio will automatically reconnect to YT every 30 minute because YT will change the raw url every 30m/1 Hour
  if (!interval) {
    interval = setInterval(async function () {
      try {
        if (stream && !stream.ended) stream.destroy();
        stream = ytdl(LIVE, { highWaterMark: 100 << 150 });
        stream.on("error", console.error);
        broadcast.play(stream);
      } catch (e) {
        return;
      }
    }, 1800000);
  }
  try {
    const connection = await channel.join();
    connection.play(broadcast);
  } catch (error) {
    console.error(error);
  }

  setInterval(async function () {
    if (!client.voice.connections.size) {
      let channel =
        client.channels.cache.get(CHANNEL) ||
        (await client.channels.fetch(CHANNEL));
      if (!channel) return;
      try {
        const connection = await channel.join();
        connection.play(broadcast);
      } catch (error) {
        console.error(error);
      }
    }
  }, 20000);
};
