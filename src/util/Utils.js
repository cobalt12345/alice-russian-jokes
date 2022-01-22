const {i18n} = require("./i18n");
const axios = require('axios').default;

const ContentType = {
    'Анекдот': 1,
    'Афоризм': 4,
    'Анекдот для взрослых': 11,
    valueOf(num) {
        switch (num) {
            case 1:
                return 'Анекдот';
            case 4:
                return 'Афоризм';
            case 11:
                return 'Анекдот для взрослых';
            default:
                throw new Error(`Unknown ContentType: ${num}`);
        }
    },
    valueOfEng(contentTypeEng) {
        switch (contentTypeEng) {
            case 'anecdote':
                return 1;
            case 'aphorism':
                return 4;
            case 'adult':
                return 11;
            default:
                throw new Error(`Unknown content type: ${contentTypeEng}`);
        }
    }
}

exports.ContentType = ContentType;


async function getFunnyContent (contentType = 1) {
    axios.defaults.headers.get['Accept'] = 'application/json; charset=utf-8';
    const url = process.env.GET_JOKE_URL + contentType;
    console.debug(`Get new joke from: ${url}`);
    const response = await axios({
        method: "get",
        url,
        responseType: "arraybuffer",
        responseEncoding: 'windows-1251'
    });
    const data = response.data;
    console.debug('Raw data:', data.toString());
    const textDecoder = new TextDecoder('windows-1251');
    const winDecodedResponse = textDecoder.decode(data);
    const textEncoder = new TextEncoder();
    const utfEncodedResponse = Buffer.from(textEncoder.encode(winDecodedResponse).buffer).toString();

    return utfEncodedResponse;
}
// module.exports.getFunnyContent = getFunnyContent;

async function getNewJoke(contentType) {
    console.debug('Get new joke: ' + ContentType.valueOf(contentType) + '/' + contentType);
    const content = unwrapJson(await getFunnyContent(contentType));

    console.debug('Funny content: ', content);

    return content;
}

function unwrapJson(jsonContent) {

    return jsonContent.toString().substring(12, jsonContent.toString().length - 2).trim();
}
module.exports.getNewJoke = getNewJoke;