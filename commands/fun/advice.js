const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');


module.exports = class EightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'advice',
            group: 'fun',
            memberName: 'advice',
            guildOnly: true,
            description: 'Get some advice!',
            examples: ['~advice'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run (message) {
        var res = await snekfetch.get("http://api.adviceslip.com/advice");
        var advice = JSON.parse(res.body)

        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Here's some advice!`, 'https://a.safe.moe/BVBr9.png')
                .setDescription(advice.slip.advice)
                .setColor('#727684');
          return message.channel.send({embed});
        
        } catch(err) {
          message.react('✖');
          return message.channel.send(`✖ Sorry! My API isn't working!`)
        }
	}
}
  