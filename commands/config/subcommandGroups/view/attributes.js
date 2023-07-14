const { MongoClient } = require('mongodb');
require('dotenv').config();

module.exports = async (interaction) => {
	const guildId = interaction.guildId;
	const uri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017';
	const client = new MongoClient(uri);

	let guildConfig;

	try {
		await client.connect();
		const database = client.db('antitoxicity');
		const config = database.collection('config');

		guildConfig = await config.findOne({ _id: guildId });
	} catch (e) {
		console.error(e);
		return await interaction.editReply('Something went wrong. If this message persists, contact the bot\'s owner');
	} finally {
		await client.close();
	}

	if (guildConfig && guildConfig.attributes && guildConfig.attributes.length > 0) {
		const attributes = '`' + guildConfig.attributes.join('`, `') + '`';
		interaction.editReply(attributes);
	} else {
		interaction.editReply('This server does not have any attributes set. With no attributes set, this value will default to `TOXICITY`');
	}
};