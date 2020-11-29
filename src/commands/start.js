const { testers_channels } = require("../config");
const util = require("../util");

module.exports.run = (client, msg, args) => {
  if (client.started) return;

  client.testers_channels = util.shuffleArray(client.testers_channels);
  // client.responders_channels = util.shuffleArray(client.responders_channels);

  if (client.testers.length % 2 === 1) {
    const removedChannels = client.testers_channels.pop();

    client.channel_pairs[client.testers_channels[client.testers_channels.length-1]]

    setTimeout(() => {
      removedChannels[0].delete().catch((e) => {
        client.log(`Error: ${e.message}`);
      });
      removedChannels[1].delete().catch((e) => {
        client.log(`Error: ${e.message}`);
      });
    }, 60000);
  }

  for (let i = 0; i < client.testers_channels.length; i += 2) {
    client.channel_pairs[client.testers_channels[i][0].id] = client.testers_channels[i+1][0];
    client.channel_pairs[client.testers_channels[i+1][0].id] = client.testers_channels[i][0];
  }

  client.started = true;
}