const {i18n} = require("../util/i18n");
const {ContentType, getNewJoke} = require("../util/Utils");

module.exports.skillHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.info('Handle. Request:', event);

    const body = JSON.parse(event.body);
    const {session, version, request} = body;
    console.debug('Joke function url: ' + process.env.getJokeFunctionUrl);
    let responseBody = {
        version,
        session,
        response: {
            text: null,
            tts: null,
            buttons: [
                {
                    title: ContentType.valueOf(ContentType.Анекдот),
                    payload: {
                        content_type: ContentType.Анекдот
                    },
                    url: undefined,
                    hide: false
                },
                {
                    title: ContentType.valueOf(ContentType.Афоризм),
                    payload: {
                        content_type: ContentType.Афоризм
                    },
                    url: undefined,
                    hide: false
                },
                {
                    title: ContentType.valueOf(ContentType["Анекдот для взрослых"]),
                    payload: {
                        content_type: ContentType["Анекдот для взрослых"]
                    },
                    url: undefined,
                    hide: false
                },
                {
                    title: 'Выход',
                    payload: {

                    },
                    url: process.env.getJokeFunctionUrl,
                    hide: false
                }
            ],
            end_session: false
        }
    };

    if (request.type === 'SimpleUtterance' && !request.command) {
        console.debug('Simple start...');
        responseBody.response.text = i18n.ru_RU.MSG_GREETING.text();
        responseBody.response.tts = i18n.ru_RU.MSG_GREETING.tts();
    } else if((request.type === 'SimpleUtterance' || request.type === 'ButtonPressed')
        && request?.nlu?.intents?.request_joke) {

        const contentTypeNum = ContentType.valueOfEng(request.nlu.intents.request_joke.slots.content_type.value);
        const content = await getNewJoke(contentTypeNum);
        console.debug(`Got a ${ContentType.valueOf(contentTypeNum)}/${contentTypeNum}:
        ${content}`);

        responseBody.response.text = content;
        responseBody.response.tts = content;

    } else if((request.type === 'SimpleUtterance' || request.type === 'ButtonPressed') && request?.nlu?.intents?.exit) {
        responseBody.response.end_session = true;
        responseBody.response.text = i18n.ru_RU.MSG_GOODBYE.text();
        responseBody.response.tts = i18n.ru_RU.MSG_GOODBYE.tts();
        responseBody.response.buttons.length = 0;
    } else {
        responseBody.response.text = i18n.ru_RU.MSG_ERROR.text(request.original_utterance);
        responseBody.response.tts = i18n.ru_RU.MSG_ERROR.tts(request.command);
    }

    const response = {
        statusCode: 200,
        headers: {
            'x-custom-header': 'my custom header'
        },
        body: JSON.stringify(responseBody)
    }
    console.debug('Handle. Response: ', responseBody);

   return response;
}