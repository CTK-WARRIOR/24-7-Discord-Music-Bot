const loadEvent = (event) => require(`../events/${event}`);

function loadEvents(client, process) {
 
  client.on("ready", () => loadEvent("ready")(client, process));
  
  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
}

module.exports = {
  loadEvents,
};
