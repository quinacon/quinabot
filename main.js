const { Client, GatewayIntentBits, ActivityType, PresenceUpdateStatus, Partials} = require('discord.js');

const tokens = require('./tokens.js');
const commands = require("./commands.js")
const config = require("./config.js")
const moderate = require("./functions/moderate.js")
const log = require("./functions/log.js")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
    ]
});

function onReady() {
    console.log("I am ready!");

    const status = client.user.setPresence({
        status: PresenceUpdateStatus.Online,
        activities: [{
            type: ActivityType.Custom,
            name: "watching quinacon's cave...",
            state: "",
        }]
    })
}

function onMessageReceived(message) {
    register(null,message)

    if (message.content.startsWith(config.prefix)) {
        const commandName = message.content.slice(config.prefix.length).split(' ')[0];
        const command = commands[commandName];
        
        if (command) {
            command.function(message);
        } else {
            message.reply("You made a typo...");
        }
    }
}

function onPresenceUpdate(oldPresence,newPresence){
    //console.log(`${newPresence.user.tag}'s status changed from status ${oldPresence.status} (${oldPresence.activities}) to ${newPresence.status} (${newPresence.activities})`);
}

function onMemberAdded(member){
    
}

function register(oldMessage,newMessage){
    log(newMessage)

    if(newMessage.author.bot) {
        return
    }
    
    moderate(newMessage)
}

client.on("ready", onReady);
client.on("messageCreate", onMessageReceived);
client.on("presenceUpdate",onPresenceUpdate)
client.on("messageUpdate",register)
client.on("guildMemberAdd",onMemberAdded)
client.on("warn",onMemberAdded)

client.login(tokens.discord);