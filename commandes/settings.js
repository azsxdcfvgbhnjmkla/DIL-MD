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
