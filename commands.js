const config = require("./config.js")

const fs = require('fs');
const path = require('path');

// Define the directory where your command files are located
const commandsDir = path.join(__dirname, 'commands');

// Initialize an empty array to store the commands
let commands = [];

// Read all files in the commands directory
fs.readdirSync(commandsDir).forEach(file => {
    // Check if the file is a JavaScript file
    if (file.endsWith('.js')) {
        // Require the command file
        const command = require(path.join(commandsDir, file));
        // Push the command object into the commands array
        commands[command.name] = command
    }
});

//adds dynamic commands command
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

// Export the array of commands
module.exports = commands;