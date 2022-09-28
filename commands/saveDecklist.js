// Decklist will be in an attachment
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const API = require('../Helpers/JsonServer');
const https = require("https");
const fs = require("fs");

const downloadFromUrl = async (url, fileName, interaction) => {
	https.get(url, (res) => {
	   const path = process.env.DECKLIST_PATH + fileName;
	   const name = fileName.split('.')[0];
	   const writeStream = fs.createWriteStream(path);
	   const uploader = `${interaction.user.username}#${interaction.user.discriminator}`;
	   const set = 'default';

	   res.pipe(writeStream);

	   writeStream.on("finish", async () => {
	      writeStream.close();

		  // Write file association to server
		  await API.postDeck(set, name, path, uploader);
		  await interaction.channel.send({embeds: [new EmbedBuilder()
				   .setColor('#1a8175')
				   .setTitle(`📖 Decklist received!!`)
				   .setDescription(`Decklist ${name} received`)]});
	   })
	})
};

const saveDeckList = async interaction => {
	const filter = m => m.author.id === interaction.user.id;
	await interaction.reply("Please post your decklist");
	const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });
	collected.forEach(msg => {
		msg.attachments.forEach(async attachment => {
			const ext = attachment.name.split('.')[1];
			if (ext !== 'cod') return;
			await downloadFromUrl(attachment.url, attachment.name, interaction);
		});
	});
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('UploadDeckList')
		.setDescription('Saves a new decklist'),
	async execute(interaction) {
		await saveDeckList(interaction);
	},
};
