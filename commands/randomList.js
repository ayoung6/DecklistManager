const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const API = require('../Helpers/JsonServer.js');
const crypto = require("crypto");

const randomList = async interaction => {
	await interaction.reply(`Fetching your random deck list...`);
	const deckLists = await API.getAllDecks();
	const index = crypto.randomInt(deckLists.length);
	const deckList = deckLists[index];
	const packet = {files: [{attachment: deckList.cod, name: `${deckList.name}.cod`}]};

	if (!!!interaction.options.get('private'))
		return await interaction.user.send(packet);
	return await interaction.channel.send(packet);
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Provides a random deck list to play')
		.addBooleanOption(option =>
			option.setName('private')
				.setDescription('Should the deck list be sent to you in a DM - Default: True')
			),
	async execute(interaction) {
		await randomList(interaction);
	},
};