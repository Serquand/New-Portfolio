import type { APIEmbedField, Channel, Embed, TextBasedChannel } from 'discord.js';
import type { InfoMail } from '../../tools/types';
import { Client, EmbedBuilder } from 'discord.js';

export const contactMailChannel = '1234199985739010259';
export const client = new Client({ intents: 3584 });
client.login(process.env.BOT_TOKEN);

async function getChannel(): Promise<Channel | null> {
    const channel = await client.channels.fetch(contactMailChannel, { force: true });
    return channel;
}

function generateEmbed(title: string, fields: APIEmbedField[] = []) {
    return new EmbedBuilder()
        .setTitle(title)
        .setFields(...fields)
        .setTimestamp(Date.now())
        .setAuthor({ name: 'Site Web', iconURL: 'https://serquand.com/S.png' })
        .setThumbnail('https://serquand.com/S.png')
        .setColor('#34b7eb');
}

function generateEmailEmbed(emailToRecontact: string, subject: string, messageContent: string) {
    const fields = [
        { name: 'Email', value: emailToRecontact, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
        { name: 'Sujet', value: subject, inline: true },
        { name: 'Début du message', inline: false, value: messageContent.slice(0, 2000) },
    ];

    return generateEmbed('Nouveau Mail', fields);
}

async function sendEmbedInChannel(embed: Embed | EmbedBuilder, channel: TextBasedChannel): Promise<boolean> {
    try {
        if ('send' in channel) {
            const content = 'Hello <@351488690029199360>, vous venez de recevoir une nouvelle demande de contact !';
            channel.send({ embeds: [embed as Embed], content });
            return true;
        } else {
            throw new Error('Something went wrong when trying to send Embed in Channel. Channel is not Sendable !');
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function sendEmbedForNewMail(info: InfoMail): Promise<boolean> {
    const channel = await getChannel();

    if (!channel || !channel.isTextBased()) {
        return false;
    }

    const embed = generateEmailEmbed(info.emailTo, info.subject, info.messageContent);

    return await sendEmbedInChannel(embed, channel);
}
