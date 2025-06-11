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
