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
	   })
	})
};

const saveDeckList = async interaction => {
	const filter = m => m.author.id === interaction.user.id;
	await interaction.reply("Please post your decklist");
	const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });
	const description = {success: [], error: []};
	collected.forEach(msg => {
		msg.attachments.forEach(async attachment => {
			const ext = attachment.name.split('.')[1];
			if (ext !== 'cod') return;
			try{
				downloadFromUrl(attachment.url, attachment.name, interaction);
				description.success.push(attachment.name);
				console.log(attachment.name);
			}catch(e){
				console.log('Error: ', e);
				description.error.push(attachment.name);
			}
		});
	});

	interaction.channel.send({embeds: [new EmbedBuilder()
		.setColor('#1a8175')
		.setTitle(`📖 Decklist Successfully Uploaded!!`)
		.setDescription(JSON.stringify(description.success))]});
	
	if (description.error.length){
		interaction.channel.send({embeds: [new EmbedBuilder()
			.setColor('#1a8175')
			.setTitle(`Decklist Errors`)
			.setDescription(JSON.stringify(description.error))]});
	}
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('savelist')
		.setDescription('Saves a new decklist'),
	async execute(interaction) {
		await saveDeckList(interaction);
	},
};
