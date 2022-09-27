const {SlashCommandBuilder} = require('discord.js');
const API = require('../Helpers/JsonServer');

const decknameoption = 'deckname';

const uploadDecklist = async interaction => {
	const deckname = interaction.options.get(decknameoption);
	await interaction.reply(`Searching for ${deckname.value}`);
	if (deckname) {
<<<<<<< HEAD
		for ([_, sets] of Object.entries(server.decks)) {
			for ([key, value] of Object.entries(sets)) {
				if (key.toLowerCase() === deckname.value.toLowerCase()) {
					await interaction.channel.send({files: [{attachment: value.cod, name: `${key}.cod`}]});
					return;
				}
			};
		};
=======
		for (let deck in await API.getAllDecks()) {
			if (deck.name.toLowerCase() === deckname.value.toLowerCase()){
				return interaction.channel.send({files: [{attachment: deck.cod, name: `${deck.name}.cod`}]});
			}
		}
>>>>>>> 897367e942e16fb08b679c6986dbda3d40ba098a
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
