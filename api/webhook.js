import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { ChatGPTAPI } from 'chatgpt';
import { config } from 'dotenv';

config();

const bot = new Telegraf(process.env.BOT_TOKEN);

export default function(req, res) {
  try {
    bot.on(message('text'), async (ctx) => {
      const api = new ChatGPTAPI({
        apiKey: process.env.API_KEY,
      });
      const res = await api.sendMessage(ctx.message.text);
    });
  } catch (e) {
    res.send(`Error: ${JSON.stringify(e)}`);
  }
  res.send('OK');
}