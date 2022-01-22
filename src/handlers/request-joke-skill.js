const {analyzeContentTypeSlotValue, ContentType} =  require("../util/Utils");

const requestJokeHandler = async function (req) {
    if (req.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${req.httpMethod} method.`);
    }

    console.info('Request joke: ', req);

    const {request, session, version} = req.body;
    const reqContentType = request?.nlu?.intents['request_joke']?.slots?.what;
    const stateContentType = req.state.application.content_type;
    let contentType;
    if (reqContentType) {
        console.info(`User requested directly a joke of type: ${reqContentType}/${ContentType.valueOf(reqContentType)}`)
        contentType = reqContentType;
    } else {
        console.info(`State content type: ${stateContentType}/${ContentType.valueOf(stateContentType)}`);
        contentType = stateContentType;
    }
    let {content_type} = analyzeContentTypeSlotValue(contentType);
    let text, tts;
    switch (content_type) {
        case ContentType.aнекдоты:
            text = tts = 'Юзер слышит смешной анекдот и у него рвутся щи!';
            break;
        case ContentType.афоризмы:
            text = tts = 'Юзер слышит глубокий афоризм и уходит в думках.';
            break;
        case ContentType["анекдоты для взрослых"]:
            text = tts = 'Юзер слышит анекдот про секс и удаляется в ванную.';
            break;
    }

    const RESPONSE = {
        version,
        session,
        response: {
            text,
            tts
        },
        application_state: {
            content_type
        }
    };

    console.debug('Request joke: ', RESPONSE);

    return RESPONSE;
}

exports.requestJokeHandler = requestJokeHandler;
