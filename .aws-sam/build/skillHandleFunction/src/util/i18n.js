exports.i18n = {
    ru_RU: {
        MSG_GREETING: {
            text: () => `Если вы готовы к безудержному юмору, расскажите мне о своих предпочтениях.
                  Я знаю кучу анекдотов, афоризмов и даже, анекдоты для взрослых! Чего изволите?`,
            tts: () => `Если вы готовы к безудержному юмору, расскажите мне о своих предпочтениях.
                  Я знаю кучу анекдотов, афоризмов и даже, анекдоты для взрослых! Чего изволите?`
        },
        MSG_ERROR: {
            text: (command) => `Я не понимаю, что значит '${command}'.`,
            tts: (command) => `Я не понимаю, что значит '${command}'.`
        },
        MSG_GOODBYE: {
            text: () => `До новых встречь!`,
            tts: () => `До новых встречь!`
        }
    }
}