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
