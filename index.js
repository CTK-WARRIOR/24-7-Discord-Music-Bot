// import config files
const { TOKEN, CHANNEL, LIVE } = require("./config.json");
const ytdl = require("ytdl-core");

// import events loader and node event handler functions
const { loadEvents } = require("./utility/loadEvents");
const { loadNode } = require("./utility/loadNode");

// Discord client
const { Client } = require("discord.js");

const client = new Client();

// error if no token provided, and error if channel id and yt url aren't valid
if (!TOKEN) {
  console.error("Please provide a valid Discord Bot Token.");
  process.exit(1);
} else if (!CHANNEL || Number(CHANNEL) == NaN) {
  console.log("Please provide a valid channel ID.");
  process.exit(1);
} else if (!ytdl.validateURL(LIVE)) {
  console.log("Please provide a valid Youtube URL.");
  process.exit(1);
}

// login
client.login(TOKEN).then(() => {
  console.log(` Successfully logged in as: ${client.user.username}#${client.user.discriminator}`);
})

// run events loader and node events handler functions
loadEvents(client, process);
loadNode(process);
