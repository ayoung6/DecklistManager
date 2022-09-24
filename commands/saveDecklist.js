// Format of args coming in
// command (save, update)
// Decklist will be in an attachment
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const server = require(`../${process.env.JSON_DATABASE}`);
const https = require("https");
const fs = require("fs");

const downloadFromUrl = async (url, name, interaction) => {
	https.get(url, (res) => {
	   const path = process.env.DECKLIST_PATH + name;
	   const writeStream = fs.createWriteStream(path);

	   res.pipe(writeStream);

	   writeStream.on("finish", () => {
	      writeStream.close();
	      server.decks.default[name.split('.')[0]] = {'cod': `${process.env.DECKLIST_PATH}${name}`, 'uploader': `${interaction.user.username}#${interaction.user.discriminator}`};
	      fs.writeFileSync(process.env.JSON_DATABASE, JSON.stringify(server));
	      console.log(server.decks.default);
	   })
	})
};

const saveDecklist = async interaction => {
	const filter = m => m.author.id === interaction.user.id;
	interaction.reply("Please post your decklist");
	const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });
	collected.forEach(msg => {
		msg.attachments.forEach(attachment => {
			downloadFromUrl(attachment.url, attachment.name, interaction);
			interaction.channel.send({embeds: [new EmbedBuilder()
                .setColor('#1a8175')
                .setTitle(`📖 Decklist received!!`)
                .setDescription(`Decklist ${attachment.name.split('.')[0]} received`)]});
		});
	});
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('savelist')
		.setDescription('Saves a new decklist'),
	async execute(interaction) {
		await saveDecklist(interaction);
	},
};