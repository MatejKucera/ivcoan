require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const Checker = require('./checker.js');


Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

bot.login(TOKEN);

bot.on('ready', () => {
  bot.user.setActivity("radar screen", { type: "WATCHING"})
  bot.user.setStatus("online");
  Checker.startChecker(bot);
  console.log('Checker started');
});

bot.on('message', msg => {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

  console.log(msg.content);

  const firstLine = msg.content.slice(PREFIX.length).split('\n')[0];
  console.log(firstLine);
  const args = firstLine.split(' ');
  console.log(args);

  const command = args.shift().toLowerCase();

  console.log(command);
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    const commandObject = bot.commands.get(command);
    commandObject.execute(msg, args);
  }
 catch (error) {
    console.error(error);
    msg.send('There was an error trying to execute that command!');
  }
});