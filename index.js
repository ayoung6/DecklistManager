require('dotenv').config(); //initialize dotenv

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client(
  {
    intents:  [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
  }
);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
  if (msg.author.bot) return;
  const reply = await msg.reply("Some Message");
  console.log(reply.content, msg.content);
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
