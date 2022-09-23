// Format of args coming in
// command (save, update)
// Decklist will be in an attachment 

module.exports = async (args, msg) => {
	const command = args[0];
	switch (command.toLowerCase()) {
		case 'updatelist':
			await updateDecklist(args, msg);
			break;
		case 'savelist':
			await SaveDeckList(args, msg);
			break;
		default:
			await msg.reply('Invalid save command, valid commands include [updatelist, savelist]');
	}
};

const saveDecklist = async (args, msg) => {
	await msg.reply('Save Deck List');
};

const updateDecklist = async (args, msg) => {
	await msg.reply('Update Deck List');
};