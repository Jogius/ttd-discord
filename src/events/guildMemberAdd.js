const config = require("../config");

module.exports = (client, member) => {
  
  let random = Math.random() < 0.5;

  member.roles.add(config.TESTER_ROLE);
  client.testers.push(member);

  member.guild.channels.create(`${member.user.username}:${member.user.discriminator}`, {
    type: "category",
    permissionOverwrites: [
      {
        id: member.guild.id,
        deny: "VIEW_CHANNEL"
      },
      {
        id: member.user.id,
        allow: "VIEW_CHANNEL"
      },
      {
        id: config.BOT_ROLE,
        allow: "VIEW_CHANNEL"
      }
    ]
  })
  .then((category) => {
    client.testers_categories.push(category);

    member.guild.channels.create("chatraum-1", {
      type: "text",
      parent: category
    })
    .then((channel1) => {
      member.guild.channels.create("chatraum-2", {
        type: "text",
        parent: category
      })
      .then((channel2) => {
        if (random) {
          client.testers_channels.push([channel1, channel2]);
        } else {
          client.testers_channels.push([channel2, channel1]);
        }
      })
      .catch((e) => {
        client.log(`Error: ${e.message}`);
      });
    });
  })
  .catch((e) => {
    client.log(`Error: ${e.message}`);
  });
}
