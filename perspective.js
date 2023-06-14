/* eslint-disable no-mixed-spaces-and-tabs */
require('dotenv').config();
const axios = require('axios').default;

/**
 * Gets scores for the supplied attributes
 * @param {string} message - The message to analyze
 * @param {array} attributes - What to analyze the message for
 * @returns {Promise} The attributes requested and their scores
 */
async function getScores(message, attributes) {
	try {

		const raw = await axios.post(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.PERSPECTIVE_KEY}`, {
			'comment': {
	        	'text': message,
	        },
    	    'languages': ['en'],
	        'requestedAttributes': formatAttributes(attributes),
		}, { 'Content-Type': 'application/json' },
		);

		const out = {};

		for (const attribute of attributes) {
			out[attribute] = raw.data.attributeScores[attribute].summaryScore.value;
		}

		return out;

	}
	catch (error) {
		console.log(error);
	}
}

/**
 * Formats attributes to function with perspective's api
 * @param {array} attributes - The attributes desired
 * @returns {object} - The attributes in their correct format
 */
function formatAttributes(attributes) {
	const formattedAttributes = {};

	attributes.forEach((attribute) => {
		formattedAttributes[attribute] = {};
	});

	return formattedAttributes;
}

exports.getScores = getScores;