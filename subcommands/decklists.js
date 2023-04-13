const { EmbedBuilder } = require('discord.js');
const API = require('../Helpers/JsonServer');
const https = require("https");
const fs = require("fs");

const attachmentPacket = (deckList) => { return {files: [{attachment: deckList.file, name: `${deckList.name}.cod`}]}; };

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

module.exports = {
	upload: async interaction => {
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
	},

	view: async interaction => {
		const deckLists = await API.getAllDecks();
		let message = '';

		for (index in deckLists){
			let deck = deckLists[index];
			message = message + `\`\`\`Deck Name: ${deck['name']}\nDeck Uploader: ${deck['uploader']}\`\`\`\n`
		}

		await interaction.reply({embeds: [new EmbedBuilder()
	                .setColor('#1a8175')
	                .setTitle(`Saved Lists`)
	                .setDescription(message)]});
	},

	download: async interaction => {
		const deckname = interaction.options.get('deckname');
		if (deckname) {
			await interaction.reply(`Searching for ${deckname.value}`);
			const lists = await API.getAllDecks();
			const deck = lists.filter(deck => deck.name.toLowerCase() === deckname.value.toLowerCase())[0];

			return await interaction.channel.send(attachmentPacket(deck));
		}
		else
			await interaction.reply("Required option `deckname` not provided");
	},

	random: async interaction => {
		await interaction.reply(`Fetching your random deck list...`);
		const deckList = await API.getRandomDeck();
		const packet = attachmentPacket(deckList);

		if (!!!interaction.options.get('private'))
			return await interaction.user.send(packet);
		return await interaction.channel.send(packet);
	},
};