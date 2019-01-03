module.exports = client => {
  const http = require("http");
  const https = require("https");
  const express = require("express");
  const app = express();

  console.log(
    `Ready to serve in ${client.channels.size} channels on ${
      client.guilds.size
    } servers, for a total of ${client.users.size} users`
  );

  app.get("/", (req, res) => {
    console.log(Date.now() + " Ping received");
    res.sendStatus(200);
  });

  app.listen(process.env.PORT || 8080);
  setInterval(() => {
    https.get("https://o4n8570moq.sse.codesandbox.io");
  }, 280000);
};
