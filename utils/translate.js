const { translate } = require('@vitalets/google-translate-api');

async function translateToHindi (text) {

    if (text === null || text === undefined) {
        return null;
    }

    const result = (await translate(text, { to: 'hi' }));

    return result.text;
}

module.exports = translateToHindi;