// https://discordjs.guide/command-handling/adding-features.html#reloading-commands

const { Channel } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'mark',
    description: 'Marks this channel for bot\'s announcements.',
	execute(message, args) {

        if(args[0] === undefined) {
            message.reply('No parameter specified. Please use "--mark on" or "--mark off".');
            return;
        }

        const path = '/ivcoandata/'+message.channel.guild.id+'.json';

        if(!fs.existsSync(path)) {
            console.group('File not exists');
            const template = {};
            fs.writeFileSync(path, JSON.stringify(template), function (err) {
                if (err) throw err;
                console.log(path + 'was created');
              }); 
        }

        let rawdata = fs.readFileSync(path);
        let data = JSON.parse(rawdata);

        if(args[0] === 'on') {
            data[message.channel.id] = message.channel.id;
            message.channel.send('This channel has been marked for announcements.');  
        } else if(args[0] === 'off') {
            delete data[message.channel.id];
            message.channel.send('This channel has will no longer recieve announcements.');  
        }

        //fs.writeFileSync(path, JSON.stringify({ data: data })); 
        //console.log(JSON.stringify(data)); 
        let json = JSON.stringify(data);
        fs.writeFileSync(path, json); 

	},
};