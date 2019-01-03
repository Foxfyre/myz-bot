module.exports = (client, message, args) => {
  const fs = require("fs");
  const playerRolls = require("../rolls/rolls.json");

  let playerExists = false;

  let baseRoll, skillRoll, gearRoll, base6, base1, skill6, gear6, gear1;

  playerRolls.map((players, index) => {
    if (players.id === message.member.id) {
      baseRoll = players.baseRoll;
      skillRoll = players.skillRoll;
      gearRoll = players.gearRoll;
      base6 = players.base6;
      base1 = players.base1;
      skill6 = players.skill6;
      gear6 = players.gear6;
      gear1 = players.gear1;
      playerExists = true;
    }
  });

  let rerollBase = baseRoll - base6 - base1;
  let rerollSkill = skillRoll - skill6;
  let rerollGear = gearRoll - gear6 - gear1;

  if (playerExists !== true) {
    message.channel.send(
      "Player role does not exist. 'Please type bb:cor #d' to roll"
    );
    return;
  }

  let pushResults6 = [];
  let pushResults1 = [];
  let results = [];
  let arrBase1 = [];
  let arrBase6 = [];
  let arrSkill6 = [];
  let arrGear1 = [];
  let arrGear6 = [];

  // push results of 6 onto the array first
  if (base6 > 0) {
    for (let i = 0; i < base6; i++) {
      pushResults6.push(client.emojis.find(x => x.name === "Base6"));
      results.push(client.emojis.find(x => x.name === "Base6"));
      arrBase6.push(client.emojis.find(x => x.name === "Base6"));
    }
  }
  if (base1 > 0) {
    for (let i = 0; i < base1; i++) {
      pushResults1.push(client.emojis.find(x => x.name === "Base1"));
      results.push(client.emojis.find(x => x.name === "Base1"));
      arrBase1.push(client.emojis.find(x => x.name === "Base1"));
    }
  }

  if (skill6 > 0) {
    for (let i = 0; i < skill6; i++) {
      pushResults6.push(client.emojis.find(x => x.name === "Skill6"));
      results.push(client.emojis.find(x => x.name === "Skill6"));
      arrSkill6.push(client.emojis.find(x => x.name === "Skill6"));
    }
  }

  if (gear6 > 0) {
    for (let i = 0; i < gear6; i++) {
      pushResults6.push(client.emojis.find(x => x.name === "Gear6"));
      results.push(client.emojis.find(x => x.name === "Gear6"));
      arrGear6.push(client.emojis.find(x => x.name === "Gear6"));
    }
  }
  if (gear1 > 0) {
    for (let i = 0; i < gear1; i++) {
      pushResults1.push(client.emojis.find(x => x.name === "Gear1"));
      results.push(client.emojis.find(x => x.name === "Gear1"));
      arrGear1.push(client.emojis.find(x => x.name === "Gear1"));
    }
  }

  // standard rolling

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

  let rerollSpec = [];
  let rrArr1 = [];
  let rrArr6 = [];

  for (let i = 0; i < rerollBase; i++) {
    let rolled = randRoll(6);
    if (rolled === 6) {
      rrArr6.push(client.emojis.find(x => x.name === "Base6"));
      arrBase6.push(client.emojis.find(x => x.name === "Base6"));
    } else if (rolled === 1) {
      rrArr1.push(client.emojis.find(x => x.name === "Base1"));
      arrBase1.push(client.emojis.find(x => x.name === "Base1"));
    } else {
      rolledResults.push(baseDice[rolled - 1]);
    }
  }
  for (let i = 0; i < rerollSkill; i++) {
    let rolled = randRoll(6);
    if (rolled === 6) {
      rrArr6.push(client.emojis.find(x => x.name === "Skill6"));
      arrSkill6.push(client.emojis.find(x => x.name === "Skill6"));
    } else {
      rolledResults.push(skillDice[rolled - 1]);
    }
  }
  for (let i = 0; i < rerollGear; i++) {
    let rolled = randRoll(6);
    if (rolled === 6) {
      rrArr6.push(client.emojis.find(x => x.name === "Gear6"));
      arrGear6.push(client.emojis.find(x => x.name === "Gear6"));
    } else if (rolled === 1) {
      rrArr1.push(client.emojis.find(x => x.name === "Gear1"));
      arrGear1.push(client.emojis.find(x => x.name === "Gear1"));
    } else {
      rolledResults.push(gearDice[rolled - 1]);
    }
  }

  results.sort();

  message.channel.send(
    `<@!${message.member.id}> pushed the roll, holding ${pushResults6.join(
      " "
    ) +
      pushResults1.join(
        " "
      )}. Rerolling ${rerollBase} Base, ${rerollSkill} Skill. ${rerollGear} Gear \n
    Reroll results ${rrArr6.join(" ")} ${rrArr1.join(" ")} ${rolledResults.join(
      " "
    )} \n
    Final Result: ${arrBase6.join(" ") +
      arrSkill6.join(" ") +
      arrGear6.join(" ") +
      arrBase1.join(" ") +
      arrGear1.join(" ")}`
  );
};
