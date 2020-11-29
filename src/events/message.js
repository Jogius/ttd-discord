const { ReactionUserManager } = require("discord.js");
const config = require("../config")

module.exports = (client, msg) => {
  if (msg.author.bot) return;

  if (msg.content.indexOf(config.PREFIX) !== 0) {
    if (!client.started) return;

    if (client.channel_pairs.hasOwnProperty(msg.channel.id)) {
      setTimeout(() => {
        client.channel_pairs[msg.channel.id].send(msg.content);
      }, Math.random() * 4000 + 2000);
    }
  } else {
    if (!msg.member.roles.cache.has(config.ADMIN_ROLE)) return;

    const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    const cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(client, msg, args);
  }  
}
