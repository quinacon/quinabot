module.exports = {
    function: function (message) {
        const startTime = Date.now();
        message.reply('Pinging...').then(sent => {
            const endTime = Date.now();
            sent.edit(`Pong! My ping is ${endTime - startTime}ms.`);
        });
    },
    name: "ping",
    description: "Returns the ping of the application."
}