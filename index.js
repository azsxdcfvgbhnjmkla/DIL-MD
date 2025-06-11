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
// react.js
module.exports = async (client, message) => {
  const reactions = ['🥰','☺️','😘','❤️','💖','🩶','🖤','🩵','😍'];
  const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
  try {
    await client.sendMessage(message.key.remoteJid, { react: { text: randomReaction, key: message.key }});
  } catch (e) {
    console.log('Error:', e);
  }
};
```

```js
// index.js
const react = require('./react.js');

client.on('message.upsert', async (m) => {
  const msg = m.messages[0];
  if (!msg.message) return;
  if (msg.key.fromMe) return;
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
  if (text.toLowerCase() === '!react') {
    react(client, msg);
  }
});

// autoread.js
module.exports = async (client, message) => {
  try {
    await client.readMessages([message.key]);
  } catch (e) {
    console.log('AutoRead Error:', e);
  }
};
```

```js
// index.js
const autoread = require('./commands/autoread.js');

client.on('message.upsert', async (m) => {
  const msg = m.messages[0];
  if (!msg.message) return;
  if (msg.key.fromMe) return;

  autoread(client, msg);
});
