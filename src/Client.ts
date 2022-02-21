import { Client as DiscordClient, ClientOptions} from 'discord.js';
import Discord, { Interaction, GuildMember, Snowflake } from 'discord.js';
import {
	AudioPlayerStatus,
	AudioResource,
	entersState,
	joinVoiceChannel,
	VoiceConnectionStatus,
} from '@discordjs/voice';
import WOKCommands from 'wokcommands';
import path from 'path';
import { config } from "dotenv";

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

    }
}



export { Client };