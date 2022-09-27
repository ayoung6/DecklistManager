const {SlashCommandBuilder, Attachment, EmbedBuilder} = require('discord.js');
const server = require(`../${process.env.JSON_DATABASE}`);

const decknameoption = 'deckname';

const uploadDecklist = async interaction => {
	const deckname = interaction.options.get(decknameoption);
	await interaction.reply(`Searching for ${deckname.value}`);
	if (deckname) {
		for ([_, sets] of Object.entries(server.decks)) {
			for ([key, value] of Object.entries(sets)) {
				if (key.toLowerCase() === deckname.value.toLowerCase()) {
					await interaction.channel.send({files: [{attachment: value.cod, name: `${key}.cod`}]});
					return;
				}
			};
		};
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