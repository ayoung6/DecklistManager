const {SlashCommandBuilder} = require('discord.js');
const DeckListCommands = require('../subcommands/decklists.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('decklists')
		.setDescription('Manage Deck Lists Here')
		.addSubcommand(subcommand =>
			subcommand
				.setName('upload')
				.setDescription('Upload a deck list')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('download')
				.setDescription('Download a deck list')
				.addStringOption(option =>
					option.setName('deckname')
						.setDescription('The name of the deck list you want returned')
						.setRequired(true)
				)
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('view')
				.setDescription('View the deck lists that we have stored')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('random')
				.setDescription('Let us send you a list')
				.addBooleanOption(option =>
					option.setName('private')
						.setDescription('Should the deck list be sent to you in a DM - Default: True')
				)
			),

	async execute(interaction) {
		await DeckListCommands[interaction.options.getSubcommand()](interaction);
	},
};