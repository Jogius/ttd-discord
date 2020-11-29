const fs = require("fs");
const path = require("path");
const Enmap = require("Enmap");
const config = require("./config");

const Discord = require("discord.js");
const client = new Discord.Client()

module.exports = {
  async start() {
    console.log("Connecting to Discord...");

    client.once("ready", async () => {

      // Load and register events from ./events
      console.log("\n|------------------------------------------")
      console.log("| Loading events from ./events");
      const events = fs.readdirSync(path.join(__dirname, "events"));
      await events.forEach((file) => {
        let event = require(path.join(__dirname, "events", file));
        let name = file.split(".")[0];
        console.log(`|   - ${name}`);
        client.on(name, event.bind(null, client));
      });
      console.log("|------------------------------------------\n")

      // Load and register commands from ./commands
      console.log("|------------------------------------------")
      console.log("| Loading commands from ./commands")
      client.commands = new Enmap();
      const commands = fs.readdirSync(path.join(__dirname, "commands"));
      await commands.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(path.join(__dirname, "commands", file));
        let name = file.split(".")[0]
        console.log(`|   - ${name}`);
        client.commands.set(name, props);
      });
      console.log("|------------------------------------------\n")


      await client.channels.fetch(config.LOG_CHANNEL).then((channel) => {
        client.log = (object) => {
          if (typeof object === "object") {
            channel.send(JSON.stringify(object, null, 4));
          } else {
            channel.send(object);
          }
        };
      });

      client.log("============================================================")

      // Instantiate runtime variables
      client.testers = [];

      client.testers_channels = [];
      client.testers_categories = [];

      client.channel_pairs = {};

      client.started = false;


      console.log("\n==================================================\n")
    });

    client.login(config.TOKEN);
  }
}
