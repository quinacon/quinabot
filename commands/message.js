module.exports = {
    function: function (message) {
        console.log(message.author.id)
        if (message.author.id == 761921710344634368) {
            const userId = message.content.slice(1).split(' ')[1];

            client.users.fetch(userId)
                .then(user => {
                    // Send a message to the user
                    user.send("Hello! This is a message from your bot.");
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });

            message.reply("yes")
        } else {
            message.reply("unauthorised")
        }
    },
    name: "message",
    description: "Message a specific user."
}