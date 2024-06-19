module.exports = {
    function: function(message){
        const roll = Math.floor(Math.random() * 6) + 1
        message.reply("You rolled " + roll+".")
    },
    name: "dice",
    description: "Returns a random number in the range of 1 and 6."
}