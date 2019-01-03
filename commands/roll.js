const fs = require("fs");

exports.run = (client, message, args) => {
  fs.readdir(process.cwd() + "/commands/rolls/", (err, files) => {
    let command = args[0];
    let standardRoll = require(process.cwd() + "/commands/rolls/standard.js");

    try {
      if (!files.includes(command + ".js")) {
        standardRoll(client, message, [...args]);
      } else {
        let rollFunction = require(process.cwd() +
          `/commands/rolls/${command}`);
        rollFunction(client, message, [...args]);
      }
    } catch (err) {
      console.error(err);
    }
  });
};
