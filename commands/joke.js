const httpRequest = require("../functions/httpsRequest.js");

function getJoke(callback) {
    const options = {
        hostname: 'v2.jokeapi.dev',
        path: '/joke/Any?safe-mode&blacklistFlags=nsfw,religious,political,racist,sexist,explicit',
        method: 'GET',
    };

    httpRequest(options)
        .then(response => {
            const jokeData = JSON.parse(response.data);
            callback(null, jokeData);
        })
        .catch(error => {
            callback(error, null);
        });
}

module.exports = {
    function: function(message){
        getJoke((error, jokeData) => {
            if (error) {
                console.error('Error:', error.message);
            } else {
                if (jokeData.type == "single") {
                    message.reply(jokeData.joke);
                } else {
                    message.reply(jokeData.setup + "\n||" + jokeData.delivery + "||");
                }
            }
        });
    },
    name: "joke",
    description: "Tells a joke."
}