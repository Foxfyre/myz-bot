module.exports = (client, message, args) => {
  const fs = require("fs");
  const playerRolls = require("../rolls/rolls.json");
  // sammple roll: m:roll 4b2s2g
  let base, skill, gear;
  //Splits the input string into "dice" groups.
  //will need to check to make sure format is correct, even # etc.
  let argArray = args[0].match(/.{1,2}/g);
  //assign values to variables based upon dice letter
  argArray.map(entry => {
    if (entry.includes("b")) base = entry[0];
    if (entry.includes("s")) skill = entry[0];
    if (entry.includes("g")) gear = entry[0];
  });

  //set dice array for custom emoji
  //set the base dice to the names then where the push happens do client.emojis.find("name", baseDice[roll-1] or whatever.)
  const baseDice = [
    client.emojis.find(x => x.name === "Base1"), //524338528298205184 :Base1:
    client.emojis.find(x => x.name === "Base2"), //524338568051687424
    client.emojis.find(x => x.name === "Base3"), //524338569146400806
    client.emojis.find(x => x.name === "Base4"), //524338569406316564
    client.emojis.find(x => x.name === "Base5"), //524338569351921666
    client.emojis.find(x => x.name === "Base6") //524338569792323586
  ];
  const skillDice = [
    client.emojis.find(x => x.name === "Skill1"),
    client.emojis.find(x => x.name === "Skill2"),
    client.emojis.find(x => x.name === "Skill3"),
    client.emojis.find(x => x.name === "Skill4"),
    client.emojis.find(x => x.name === "Skill5"),
    client.emojis.find(x => x.name === "Skill6") //skill6
  ];
  const gearDice = [
    client.emojis.find(x => x.name === "Gear1"),
    client.emojis.find(x => x.name === "Gear2"),
    client.emojis.find(x => x.name === "Gear3"),
    client.emojis.find(x => x.name === "Gear4"),
    client.emojis.find(x => x.name === "Gear5"),
    client.emojis.find(x => x.name === "Gear6") // gear6
  ];

  const randRoll = side => Math.floor(Math.random() * side + 1);

  let rolledResults = [];
  let base6 = 0;
  let skill6 = 0;
  let gear6 = 0;
  let base1 = 0;
  let gear1 = 0;
  let arr6 = [];
  let arr1 = [];

  for (let i = 0; i < base; i++) {
    let rolled = randRoll(6);
    if (rolled === 6) {
      base6 += 1;
      arr6.push(client.emojis.find(x => x.name === "Base6"));
    } else if (rolled === 1) {
      base1 += 1;
      arr1.push(client.emojis.find(x => x.name === "Base1"));
    } else {
      rolledResults.push(baseDice[rolled - 1]);
    }
  }

  for (let i = 0; i < skill; i++) {
    let rolled = randRoll(6);
    if (rolled === 6) {
      skill6 += 1;
      arr6.push(client.emojis.find(x => x.name === "Skill6"));
    } else {
      rolledResults.push(skillDice[rolled - 1]);
    }
  }
  for (let i = 0; i < gear; i++) {
    let rolled = randRoll(6);
    if (rolled === 6) {
      gear6 += 1;
      arr6.push(client.emojis.find(x => x.name === "Gear6"));
    } else if (rolled === 1) {
      gear1 += 1;
      arr1.push(client.emojis.find(x => x.name === "Gear1"));
    } else {
      rolledResults.push(gearDice[rolled - 1]);
    }
  }

  let entry = {
    id: message.member.id,
    baseRoll: base,
    skillRoll: skill,
    gearRoll: gear,
    base6: base6,
    base1: base1,
    skill6: skill6,
    gear6: gear6,
    gear1: gear1
  };
  // if previous record for player exists, remove entry
  playerRolls.map((players, index) => {
    if (players.id === message.member.id) {
      playerRolls.splice(index, 1);
    }
  });
  playerRolls.push(entry);

  fs.writeFileSync(
    __dirname + "/rolls.json",
    JSON.stringify(playerRolls),
    err => console.error
  );

  message.channel.send(
    arr6.join(" ") + arr1.join(" ") + rolledResults.join(" ")
  );
};
