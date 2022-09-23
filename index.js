require('dotenv').config(); //initialize dotenv

const { Client, GatewayIntentBits } = require('discord.js');
const {SaveDeckList, LoadDeckList, ListDecklists} = require('./app');
const prefix = "!dm";

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
const handoff = async (args, msg) => {
  const command = args[0];

  switch (command.toLowerCase()){
    case 'updatelist':
    case 'savelist':
      await SaveDeckList(args, msg);
      break;
    case 'loadlist':
      await LoadDeckList(args, msg);
      break;
    case 'list':
    case 'show':
      await ListDecklists(args, msg);
      break;
    default:
      await msg.reply('Your command of `' + command + '` returned no actions');
  }
}

client.on('ready', () => {
  
});

client.on('messageCreate', async msg => {
  const message = msg.content;
  if (!message.startsWith(prefix)) return;

  let args = message.split(' ');
  args = args.splice(1, args.length-1);

  await handoff(args, msg);
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
