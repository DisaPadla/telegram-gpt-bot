const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

(async () => {
  await bot.telegram.setWebhook(process.env.PROJECT_PATH);

  // await bot.telegram.deleteWebhook();

  await bot.telegram.getWebhookInfo().then(console.log);
})();