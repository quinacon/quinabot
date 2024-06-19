const config = require("./config.js")

const fs = require('fs');
const path = require('path');

const commandsDir = path.join(__dirname, 'commands');

let commands = [];

fs.readdirSync(commandsDir).forEach(file => {
    if (file.endsWith('.js')) {
        const command = require(path.join(commandsDir, file));
        commands[command.name] = command
    }
});

commands["commands"] = {
    function: function (message) {
        let formattedString = `**Prefix**: ${config.prefix}\n\n**Commands:**\n`;
       
        for (const command in commands) {
            formattedString += `* **${commands[command].name}**: ${commands[command].description}\n`;
        }

        message.reply(formattedString)
    },
    name: "commands",
    description: "Lists up all commands."
}

module.exports = commands;