module.exports.colors = {
	'Reset': '\x1b[0m',
	'Bright': '\x1b[1m',
	'Dim': '\x1b[2m',
	'Underscore': '\x1b[4m',
	'Blink': '\x1b[5m',
	'Reverse': '\x1b[7m',
	'Hidden': '\x1b[8m',

	'FgBlack': '\x1b[30m',
	'FgRed': '\x1b[31m',
	'FgGreen': '\x1b[32m',
	'FgYellow': '\x1b[33m',
	'FgBlue': '\x1b[34m',
	'FgMagenta': '\x1b[35m',
	'FgCyan': '\x1b[36m',
	'FgWhite': '\x1b[37m',
	'FgGray': '\x1b[90m',

	'BgBlack': '\x1b[40m',
	'BgRed': '\x1b[41m',
	'BgGreen': '\x1b[42m',
	'BgYellow': '\x1b[43m',
	'BgBlue': '\x1b[44m',
	'BgMagenta': '\x1b[45m',
	'BgCyan': '\x1b[46m',
	'BgWhite': '\x1b[47m',
	'BgGray': '\x1b[100m',
};

/**
 * Logs a stylized warn message
 * @param {any} message The warning message
 * @returns undefined
 */
module.exports.warn = (message) => {
	//           gray     yellow      gray     reset
	console.log('\x1b[90m[\x1b[33mWARN\x1b[90m]\x1b[0m ' + message);
};

/**
 * Logs a stylized info message
 * @param {any} message The info message
 * @returns undefined
 */
module.exports.info = (message) => {
	//           gray     purple      gray                     reset
	console.log('\x1b[90m[\x1b[34mINFO\x1b[90m] ' + message + '\x1b[0m');
};

/**
 * Logs a stylized error message
 * @param {any} message The error message
 * @returns undefined
 */
module.exports.error = (message) => {
	//           gray     red          gray      red                    reset
	console.log('\x1b[90m[\x1b[31mERROR\x1b[90m] \x1b[31m' + message + '\x1b[0m');
};

module.exports.formatString = (str) => {
	const words = str.split('_');

	const formattedWords = words.map(word => {
		const firstLetter = word.charAt(0).toUpperCase();
		const restOfWord = word.slice(1).toLowerCase();
		return firstLetter + restOfWord;
	});

	return formattedWords.join(' ');
};

module.exports.roundPercentage = (value) => {
	const percentage = value * 100;
	return Math.round(percentage * 10) / 10;
};