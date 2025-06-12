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
client.on('message.upsert', async (m) => {
  const msg = m.messages[0];
  if (!msg.message) return;
  if (msg.key.fromMe) return;

  const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

  if (text.toLowerCase() === 'hello') {
    await client.sendMessage(msg.key.remoteJid, { text: 'Hi there!' });
  }

  if (text.toLowerCase() === 'help') {
    await client.sendMessage(msg.key.remoteJid, { text: 'Here is the help menu...' });
  }
});

// index.js
client.on('message.upsert', async (m) => {
  const msg = m.messages[0];
  if (!msg.message) return;
  if (msg.key.fromMe) return;

  const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

  if (text.toLowerCase() === 'ping') {
    await client.sendMessage(msg.key.remoteJid, { text: 'pong' });
  }
});
const fs = require('fs');
if (fs.existsSync('set.env')) require('dotenv').config({ path: __dirname + '/set.env' });

module.exports = {
  SESSION_ID: process.env.SESSION_ID || '',
  OWNER_NAME: process.env.OWNER_NAME || '𝐃𝚰𝐋 𝚳𝐃',
  BOT_NAME: process.env.BOT_NAME || '𝐃𝚰𝐋 𝚳𝐃',
  NUMERO_OWNER: process.env.NUMERO_OWNER || '255699155695',
  PREFIX: process.env.PREFIX || '.',
  PUBLIC_MODE: process.env.PUBLIC_MODE || 'yes',
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || 'yes',
  AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
  IMAGE_MENU: process.env.IMAGE_MENU || 'https://files.catbox.moe/qef0o9.jpg',
  STARTING_BOT_MESSAGE: process.env.STARTING_BOT_MESSAGE || 'yes',
  ANTI_DELETE_MESSAGE: process.env.ANTI_DELETE_MESSAGE || 'yes',
  PRESENCE: process.env.PRESENCE || 'online',
  DATABASE_URL: process.env.DATABASE_URL || '',
  WARN_COUNT: process.env.WARN_COUNT || '3',
};


```js
// ping.js
module.exports = {
  name: 'ping',
  description: 'Ping command',
  execute: async (client, message) => {
    const sentMsg = await client.sendMessage(message.key.remoteJid, { text: 'Pinging...' });
    const latency = sentMsg.messageTimestamp - message.messageTimestamp;
    await client.sendMessage(message.key.remoteJid, { text: `Pong! Latency is ${latency}ms.` });
  }
};
```
// index.js
const ping = require('./ping.js');

client.on('message.upsert', async (m) => {
  const msg = m.messages[0];
  if (!msg.message) return;
  if (msg.key.fromMe) return;
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
  if (text.toLowerCase() === 'ping') {
    ping.execute(client, msg);
  }
});
// menu.js
module.exports = async (client, m) => {
const menu = `╭───⌈👑 𝐃𝚰𝐋 𝚳𝐃 𝐁𝐎𝐓 👑⌋───◆
│
│🌐 *Welcome to 𝐃𝚰𝐋 𝚳𝐃 Bot*
│
│📌 Choose an option below:
│
│1️⃣ ᴄᴏᴍᴍᴀɴᴅꜱ ʟɪꜱᴛ
│2️⃣ ᴏᴡɴᴇʀ ɪɴꜰᴏ
│3️⃣ ʙᴏᴛ ꜱᴛᴀᴛᴜꜱ
│4️⃣ ꜱᴇᴛᴛɪɴɢꜱ
│5️⃣ ᴄʜᴀɴɴᴇʟ 🔗
│
╰───⌈⚡ 𝐃𝚰𝐋 𝚳𝐃 ⚡⌋───◆`;

await client.sendMessage(m.chat, { text: menu }, { quoted: m });
};
```

```js
// index.js (sehemu ya kujumuisha menu)
const menu = require('./menu');
client.on('message', async (m) => {
  const text = m.body || '';
  if (text.toLowerCase() === 'menu') {
    return menu(client, m);
  }
});
```

*Link ya channel (option 5):*
```js
if (text === '5') {
    return client.sendMessage(m.chat, { text: '🔗 Join our Channel:\nhttps://whatsapp.com/channel/0029Vb5vW8yLikgAkyNxnY1H' }, { quoted: m });
}
```
