const SkillResponse = {
    "response": {
    "text": "Здравствуйте!\nЭто мы, хороводоведы.",
        "tts": "Здравствуйте!\nЭто мы, хоров+одо в+еды.",
        "card": {
        "type": "...",
    },
    "buttons": [
        {
            "title": "Надпись на кнопке",
            "payload": {},
            "url": "https://example.com/",
            "hide": true
        }
    ],
        "end_session": false,
        "directives": {}
},
    "session_state": {
    "contentType": 1
},
    "user_state_update": {
    "value": 42
},
    "application_state": {
    "contentType": 11
},
    "analytics": {
    "events": [
        {
            "name": "custom event"
        },
        {
            "name": "another custom event",
            "value": {
                "field": "some value",
                "second field": {
                    "third field": "custom value"
                }
            }
        }
    ]
},
    "version": "1.0"
}

export default SkillResponse;