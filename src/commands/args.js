module.exports = {
    name: 'args',
    description: 'Show arguments',
    execute(msg, args) {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        }

        msg.channel.send(`Command name: ${this.name}\nArguments: ${args}`);
    },
  };