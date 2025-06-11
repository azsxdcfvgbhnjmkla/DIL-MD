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
