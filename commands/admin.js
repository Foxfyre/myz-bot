exports.run = (client, message, args, config) => {
  if (args[0] == "server") {
    message.channel.send(
      `Mutant: Year Zero bot is active in ${
        client.guilds.size
      } server(s) which are as follows `
    );
    client.guilds.map(guilds => {
      message.channel.send(`${guilds.name} owned by <@!${guilds.owner.id}>`);
    });
  }

  if (args[0] == "pet") {
    if (message.author.id === config.ownerID) {
      message.channel.send("Hello my mistress");
    } else {
      message.channel.send("Don't touch me!");
    }
  }
};
