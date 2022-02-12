import { Client } from "./Client";

import { config } from "dotenv";

import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

config();

const token: string = process.env.TOKEN;
const clientId: string = process.env.CLIENTID;
const guildId: string = process.env.GUILDID;


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('amogus').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const client = new Client(
    { intents: [ "GUILDS" , "GUILD_MESSAGES"] },
    token
);

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);


client.start();