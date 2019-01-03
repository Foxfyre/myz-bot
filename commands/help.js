exports.run = (client, message, args, config) => {
  message.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Help",
      description:
        "These are the current help topics for the Mutant Year Zero bot.",
      fields: [
        {
          name: "roll",
          value:
            "To do a standard roll use the following syntax. m:roll <#>b<#>s<#>g, where <#> are replaced with the quantity of dice you are to roll. Example: m:roll 3b2s2g. "
        },
        {
          name: "push",
          value:
            "Syntax: m:roll push. To push a roll means to hold onto the '6s' & '1s' and reroll the rest. Can only push once unless you have the talent from Genlab Alpha."
        }
      ],
      timestamp: new Date()
    }
  });
};
