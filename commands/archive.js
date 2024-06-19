const { EmbedBuilder } = require('discord.js');

module.exports = {
    function: function (message) {
        const userId = message.content.slice(1).split(' ')[1]
        const guild = message.guild

        if (guild) {
            const member = guild.members.fetch(userId)
                .then(member => {
                    if (member) {
                        const exampleEmbed = new EmbedBuilder()
                        const joinDate = member.joinedAt;
                        const creationDate = new Date(member.user.createdTimestamp);
                        const formattedJoinDate = `${joinDate.getDate()}/${joinDate.getMonth() + 1}/${joinDate.getFullYear()}`;
                        const formattedCreationDate = `${creationDate.getDate()}/${creationDate.getMonth() + 1}/${creationDate.getFullYear()}`;
                        const roles = member.roles.cache.map(role => role.name);
                        exampleEmbed.setColor(0x000000)
                        exampleEmbed.setTitle(member.displayName)
                        exampleEmbed.setDescription(member.user.tag+"\n"+member.presence.status+"\nJoined at: "+formattedJoinDate+"\nCreated at: "+formattedCreationDate+"\nRoles: "+roles.join(', '))
                        exampleEmbed.setThumbnail(member.user.avatarURL())
                        exampleEmbed.setTimestamp()
                        exampleEmbed.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
                        
                        member.presence.activities.forEach(function(activity){
                            exampleEmbed.addFields({name: activity.name, value: `${activity.state || ""}\n${activity.details || ""}`})
                        })

                        message.reply({ embeds: [exampleEmbed] });
                    } else {
                        console.log('Member not found!');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            message.reply("You can only use this command in a mutual Server.")
        }
    },
    name: "archive",
    description: "Replies with the current status of the user."
}