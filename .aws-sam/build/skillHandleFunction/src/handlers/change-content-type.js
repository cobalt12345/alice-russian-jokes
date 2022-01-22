const {i18n} = require("../util/i18n");
const {analyzeContentTypeSlotValue} = require("../util/Utils");

exports.changeContentTypeHandler = async (req) => {
    if (req.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${req.httpMethod} method.`);
    }

    console.info('Change type. Request: ', req);

    const {request, session, version} = req.body;
    const reqContentType = request.nlu.intents['change_content'].slots.what;
    const {text, tts, content_type} = analyzeContentTypeSlotValue(reqContentType);

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

    console.debug('Change type. Response: ', RESPONSE);

    return RESPONSE;
}
