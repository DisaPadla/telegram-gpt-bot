import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { ChatGPTAPI } from 'chatgpt';
import { config } from 'dotenv';

config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on(message('text'), async (ctx) => {
  const api = new ChatGPTAPI({
    apiKey: process.env.API_KEY,
  });
  const result = await api.sendMessage(ctx.message.text);
  ctx.reply(result.text)
});

export default function(req, res) {
  try {

  } catch (e) {
    res.send(`Error: ${JSON.stringify(e)}`);
  }
  res.send(`OK ${JSON.stringify(req.body)}`);
}