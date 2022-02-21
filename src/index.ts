import { Client } from "./Client";

import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { config } from "dotenv";
config();

const token: string = process.env.TOKEN;
const clientId: string = process.env.CLIENTID;
const guildId: string = process.env.GUILDID;

const client = new Client(
    { intents: [ 'GUILD_VOICE_STATES', 'GUILDS' , 'GUILD_MESSAGES'] },
    token
);

const rest = new REST({ version: '9' }).setToken(token);

client.start();