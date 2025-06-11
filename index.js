const { Client } = require('whatsapp-web.js');
require('dotenv').config();

const client = new Client({
    session: JSON.parse(process.env.SESSION_ID),
    puppeteer: { headless: true }
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', msg => {
    if (msg.body.toLowerCase() === 'hi') {
        msg.reply('Hello! I am your bot.');
    }
});

client.initialize();
const { GroupParticipant } = require('whatsapp-web.js');

module.exports = async (client, message) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;

    if (message.from.includes('@g.us') && message.body.match(linkRegex)) {
        const chat = await message.getChat();
        const sender = await message.getContact();

        if (!chat.isGroup) return;
        const admins = await chat.getAdmins();
        const isAdmin = admins.some(admin => admin.id._serialized === message.author);

        if (!isAdmin) {
            await message.reply('*❌ Link Detected! You will be removed.*');
            await chat.removeParticipants([sender.id._serialized]);
        }
    }
};
