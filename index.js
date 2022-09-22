require('dotenv').config(); //initialize dotenv

const { Client, GatewayIntentBits } = require('discord.js');
const app = require('./app');
const prefix = "!dl";

const client = new Client(
  {
    intents:  [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
  }
);

// Function to parse what functionality the user wants
// Hands off process to one of the App classes
const handoff = async args => {

}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(app);
});

client.on('messageCreate', async msg => {
  if (!msg.content.startsWith(prefix)) return;

  await handoff()
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
