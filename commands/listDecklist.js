const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const API = require('../Helpers/JsonServer.js');

const listDeckLists = async interaction => {
	const deckLists = await API.getAllDecks();
	interaction.channel.send({embeds: [new EmbedBuilder()
                .setColor('#1a8175')
                .setTitle(`Saved Lists`)
                .setDescription(`${JSON.stringify(deckLists, null, 4)}`)]});
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listlists')
		.setDescription('Lists all saved decklists'),
	async execute(interaction) {
		await listDeckLists(interaction);
	},
};
