// import config files
const { CHANNEL, LIVE } = require("./config.json");
const ytdl = require("ytdl-core");

// import events loader and node event handler functions
const { loadEvents } = require("./utility/loadEvents");
const { loadNode } = require("./utility/loadNode");

// Discord client
const { Client } = require("discord.js");

const client = new Client();
const TOKEN = process.env['TOKEN']
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

const fs = require('fs');
const fileName = './config.json';
const file = require(fileName);
const prefix = "."; 
const flag=1;

// Turn bot off (destroy), then turn it back on
function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(TOKEN));
}

client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	if (command === 'ping') {
		message.channel.send('Pong.');
	} 
  else if (command === 'change') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		} else {
      file.LIVE = args[0];
fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});
      //console.clear();
      //client.destroy()
      //client.login(TOKEN);
      
			return message.channel.send('Stream Changed');
      resetBot(message.channel);
      switch(flag)
        {
          case 1:break;
        }
		}

		//message.channel.send(`First argument: ${args[0]}`);
	}
});



require('./server')();
// login
client.login(TOKEN).then(() => {
  console.log(` Successfully logged in as: ${client.user.username}#${client.user.discriminator}`);
})

// run events loader and node events handler functions
loadEvents(client, process);
loadNode(process);
