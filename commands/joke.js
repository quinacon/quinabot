const httpRequest = require("../functions/httpsRequest.js");

function getJoke(callback) {
    // Define the options for the HTTP request
    const options = {
        hostname: 'v2.jokeapi.dev',
        path: '/joke/Any?safe-mode&blacklistFlags=nsfw,religious,political,racist,sexist,explicit',
        method: 'GET',
    };

    // Make the HTTP request using the httpRequest module
    httpRequest(options)
        .then(response => {
            // Parse the JSON response
            const jokeData = JSON.parse(response.data);
            // Pass the joke data to the callback function
            callback(null, jokeData);
        })
        .catch(error => {
            // If there is an error with the HTTP request, pass it to the callback
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