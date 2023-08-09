const translate = require('google-translate-api');

exports.translateToHindi = async (text) => {

    if (text === null || text === undefined) {
        return null;
    }

    const result = await translate(text, { to: 'hi' });

    if (!result) {
        return text;
    }

    return result.text;
}