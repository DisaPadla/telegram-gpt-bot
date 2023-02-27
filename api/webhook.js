import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { ChatGPTAPI } from 'chatgpt';
import { config } from 'dotenv';

config();
const SECRET_HASH = process.env.SECRET_HASH;
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on(message('text'), async (ctx) => {
  const api = new ChatGPTAPI({
    apiKey: process.env.API_KEY,
  });
  const result = await api.sendMessage(ctx.message.text);
  await ctx.reply(result.text);
});

export default async function(req, res) {
  try {
    const { body, query } = req

    if (query.setWebhook === "true") {
      const webhookUrl = `${process.env.PROJECT_PATH}/api/webhook?secret_hash=${SECRET_HASH}`

      // Would be nice to somehow do this in a build file or something
      const isSet = await bot.telegram.setWebhook(webhookUrl)
      console.log(`Set webhook to ${webhookUrl}: ${isSet}`)
    }

    if (query.secret_hash === SECRET_HASH) {
      bot.handleUpdate(body)
    }
  } catch (e) {
    console.log(e.toString());
  }
  res.status(200).send('OK');
}