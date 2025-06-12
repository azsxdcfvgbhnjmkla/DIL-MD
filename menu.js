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
