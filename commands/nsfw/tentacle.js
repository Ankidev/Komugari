const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class TentacleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tentacle',
            aliases: ['shokushu', 'tentai', 'tentacles'],
            group: 'nsfw',
            memberName: 'tentacle',
            guildOnly: true,
            description: 'Finds...tentacle..porn?? For...?? You!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~tentacle'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if(!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }
        
        try {
            randomPuppy('tentai')
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`tentacles`)
                        .setImage(url)
                        .setColor('#A187E0');
                    return message.channel.send({embed});
                })
    
            } catch(err) {
                return message.channel.send('✖ Something went wrong while executing that function!');
        }
    }
}