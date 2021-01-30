const IvaoWhazzup = require('ivao-whazzup').default;
const fs = require('fs');
const util = require('util')

module.exports = {
    path: '/ivcoandata/data.json',
    directory: '/ivcoandata/',
    icaoPrefix: null,
    controllers: {},
    bot: null,
    startChecker(bot) {
        this.icaoPrefix = process.env.FIR;
        this.bot = bot;
        this.check(process.env.REPORT_ON_START);
        setInterval(() => this.check(), process.env.INTERVAL * 1000);
    },
    check(report = true) {
        let channels = [];

        fs.readdirSync(this.directory).forEach(file => {
            const data = fs.readFileSync(this.directory + file, {encoding:'utf8', flag:'r'}); 
            channels.push(JSON.parse(data));
        });

        const ivaoWhazzupBuilder = IvaoWhazzup.makeBuilder();
        const ivaoWhazzup = ivaoWhazzupBuilder.build();
        ivaoWhazzup.fetchData().then((result) => {
            //console.log(util.inspect(data.clients[0], {showHidden: false, depth: 0}))
            //console.log(result.clients[0]);
            let data = result.clients;
            let lastCheckedControllers = [];

            console.log('Checking onlines started');
            for (var i = 0; i < data.length; i++) {
                if(data[i].connection.type === 'ATC') {
                    //console.log(data[i]);
                    const callsign = data[i].callsign;
                    if(!callsign.includes('_OBS')) {
                        const frequency = data[i].frequency;
                        const name = data[i].member.name;
                        const icao = callsign.split('_')[0];
                        lastCheckedControllers[callsign] = callsign;
                        if(icao.substring(0,2) === this.icaoPrefix && !callsign.includes('ATIS')) {
                            if(this.controllers[callsign] === undefined) {
                                this.controllers[callsign] = callsign;
                                this.report(report, channels, callsign, name, frequency, 'online');
                            }
                        }
                    }
                }
            }

            //console.log('Checking offlines started');
            for (const [key, value] of Object.entries(this.controllers)) {
                const callsign = key;
                console.log("Checking for "+callsign+ ' - ' + lastCheckedControllers[callsign]);
                if(lastCheckedControllers[callsign] === undefined) {
                    delete this.controllers[callsign];
                    this.report(true, channels, callsign, null, null, 'offline');
                }
            }
        }).catch(console.error);

        /*const handler = new DataHandler();
        handler.getControllers().then(data => {
            let lastCheckedControllers = [];

            //console.log('Checking onlines started');
            for (var i = 0; i < data.length; i++) {
                const callsign = data[i].callsign;
                const frequency = data[i].frequency;
                const name = data[i].realname;
                const icao = callsign.split('_')[0];
                lastCheckedControllers[callsign] = callsign;
                if(icao.substring(0,2) === this.icaoPrefix && !callsign.includes('ATIS')) {
                    if(this.controllers[callsign] === undefined) {
                        this.controllers[callsign] = callsign;
                        this.report(report, channels, callsign, name, frequency, 'online');
                    }
                }
            }

            //console.log('Checking offlines started');
            for (const [key, value] of Object.entries(this.controllers)) {
                const callsign = key;
                //console.log("Checking for "+callsign+ ' - ' + lastCheckedControllers[callsign]);
                if(lastCheckedControllers[callsign] === undefined) {
                    delete this.controllers[callsign];
                    this.report(true, channels, callsign, null, null, 'offline');
                }
            }
        });*/


    },
    activeChannels() {
        let rawdata = fs.readFileSync(this.path);
        let data = JSON.parse(rawdata);
        return data;
    },
    report(report, channels, callsign, name, frequency, status) {
        if(!report) {
            return;
        }
        for(let i = 0; i < channels.length; i++) {
            for (const [key, value] of Object.entries(channels[i])) {
                let channel = this.bot.channels.get(key);
                console.log('Reporting to channel: '+channel.guild.name +'.'+ channel.name);
                if(status == 'online') {
                    channel.send('🛫 '+ callsign + ' went online on '+frequency+'.');
                } else {
                    channel.send('🛬 '+ callsign + ' went offline.');
                }
                
            }
        }
        
    }
  };