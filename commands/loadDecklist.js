const {SlashCommandBuilder} = require('discord.js');
const API = require('../Helpers/JsonServer');

const decknameoption = 'deckname';

const uploadDecklist = async interaction => {
	const deckname = interaction.options.get(decknameoption);
	if (deckname) {
		for (let deck in await API.getAllDecks()) {
			if (deck.name.toLowerCase() === deckname.value.toLowerCase()){
				return interaction.channel.send({files: [{attachment: deck.cod, name: `${deck.name}.cod`}]});
			}
		}
	}
	else
		interaction.reply("Required option `deckname` not provided");
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loadlist')
		.setDescription('Attempts to load a previously saved decklist')
		.addStringOption(option =>
			option.setName(decknameoption)
				.setDescription('The name of the decklist you want returned')
				.setRequired(true)
			),
	async execute(interaction) {
		await uploadDecklist(interaction);
	},
};
