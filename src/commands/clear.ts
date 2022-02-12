import { ICommand } from 'wokcommands'

export default {
    name: 'Clear',
    description: 'Clears messages',
    category: 'Moderation',

    persmissions: ['ADMINISTATOR'],

    maxArgs: 1,
    expectedArgs: '[amount]',

    slash: 'both',

    callback: async ({ message, interaction, channel, args }) => {
        const amount = args.length ? parseInt(args.shift()) : 1

        if(message) {
            await message.delete()
        }

        const messages = await channel.messages.fetch({ limit: amount})
        const { size } = messages

        messages.forEach((message) => message.delete())

        const reply = `Deleted ${size} messages`

        if (interaction) {
            return reply
        }

        channel.send(reply)

        
    }

} as ICommand