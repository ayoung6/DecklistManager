const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const server = require(`../${process.env.JSON_DATABASE}`);

const listDecklists = async interaction => {
	interaction.channel.send({embeds: [new EmbedBuilder()
                .setColor('#1a8175')
                .setTitle(`Saved Lists`)
                .setDescription(`${JSON.stringify(server, null, 4)}`)]});
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listlists')
		.setDescription('Lists all saved decklists'),
	async execute(interaction) {
		await listDecklists(interaction);
	},
};