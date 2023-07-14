const { MongoClient } = require('mongodb');
require('dotenv').config();

module.exports = async (interaction) => {
	const channel = interaction.options.getChannel('channel');
	const guildId = interaction.guildId;
	const uri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017';
	const client = new MongoClient(uri);
	let result;

	try {
		await client.connect();
		const database = client.db('antitoxicity');
		const config = database.collection('config');

		result = await config.updateOne({ _id: guildId }, { $pull: { ignoredChannels: channel.id } });
	} catch (e) {
		console.error(e);
		return await interaction.editReply('Something went wrong. If this message persists, contact the bot\'s owner');
	} finally {
		await client.close();
	}

	if (result.modifiedCount === 0) await interaction.editReply(`Could not remove ${channel} as an ignored channel, as it was never an ignored channel`);
	await interaction.editReply(`Removed ${channel} as an ignored channel`);
};