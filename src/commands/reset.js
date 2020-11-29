module.exports.run = (client, msg, args) => {
  client.testers_channels.forEach((channels) => {
    channels[0].delete().catch((e) => {
      client.log(`Error: ${e.message}`);
    });
    channels[1].delete().catch((e) => {
      client.log(`Error: ${e.message}`);
    });
  });
  client.testers_categories.forEach((category) => {
    category.delete().catch((e) => {
      client.log(`Error: ${e.message}`);
    });
  });
  client.testers.forEach((member) => {
    member.kick().catch((e) => {
      client.log(`Error: ${e.message}`);
    });
  });

  client.testers = [];

  client.testers_channels = [];
  client.testers_categories = [];

  client.channel_pairs = {};

  client.started = false;

  client.log("The bot has been reset.")
}
