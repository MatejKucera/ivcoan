// https://discordjs.guide/command-handling/adding-features.html#reloading-commands

const { Channel } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'list',
    description: 'Lists all active channels for announcements.',
	execute(message, args) {

        const path = '/ivcoandata/'+message.channel.guild.id+'.json';

        let rawdata = fs.readFileSync(path);
        let channels = JSON.parse(rawdata);

        let result = 'Active channels: \n';

        for (const [key, value] of Object.entries(channels)) {
            let channel = message.guild.channels.get(key);
            result += ' - ' + channel.name  + ' \n';
        }
          
        message.channel.send(result);
	},
};