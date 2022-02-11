import { Client as DiscordClient, ClientOptions } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

class Client extends DiscordClient {
    
    public constructor(options: ClientOptions, token: string) {
        super(options);
        this.login(token)
    }

    start() {

        this.on("ready", () => {
            console.log(`${this.user.tag} is online`)
        });

        this.on("message", (msg)=>{
            if(msg.content === 'Info') {
                msg.reply(
                    `Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}
                    `
                )
            }
        });

        this.on('messageCreate', (msg) => {
            if(msg.author.bot) return;

            // if (msg.mentions) {
            //     msg.reply({
            //         content: `${msg.author} хули ты пингуешь? Я тоже так могу.`
            //     })
            // }
        });

        this.on('interactionCreate',  interaction => {
            if (!interaction.isCommand()) return;
        
            const { commandName } = interaction;
        
            if (commandName === 'ping') {
                 interaction.reply('Pong!');
            } else if (commandName === 'server') {
                 interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
            } else if (commandName === 'user') {
                 interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
            }
        });
    }
};

export { Client };