import { Client as DiscordClient, ClientOptions } from 'discord.js';
import Discord from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import { config } from "dotenv";
import ytdl from 'ytdl-core';

config();

const prefix: string = process.env.PREFIX;

class Client extends DiscordClient {
    
    public constructor(options: ClientOptions, token: string) {
        super(options);
        this.login(token)
    }

    start() {
        this.once("ready", () => {
            console.log(`${this.user.tag} is online`)
        });

        this.on('ready', () => {
            new WOKCommands(this, {
              commandsDir: path.join(__dirname, 'commands'),
              typeScript: true
            })
        });
          
        this.on('message', (msg) => {

            if(msg.author.bot) return;


 
        });






















        this.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
        
            const { commandName } = interaction;
        
            if (commandName === 'ping') {
                await interaction.reply('Pong!');
            } else if (commandName === 'amogus') {
                await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
            } else if (commandName === 'user') {
                await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
            }
        });
    }
};

export { Client };