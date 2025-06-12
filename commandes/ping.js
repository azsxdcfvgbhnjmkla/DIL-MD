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

```js
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
