const update_dabs = require("./_update_dabs.js")

function build_embed(guild_member, config) {
    user = update_dabs(guild_member, config)
    return {embed: {
        author: {
            name: guild_member.displayName,
            icon_url: guild_member.user.avatarURL
        },
        color: guild_member.displayColor,
        fields: [
            { inline: true, name: "Dabs", value: String(user.dabs) },
            { inline: true, name: "Highest held dabs", value: String(user.dab_record) },
            { inline: true, name: "Level", value: String(user.level) },
            { inline: true, name: "Daily rolls left", value: String(user.daily_rolls) },
        ]
    }}
}

module.exports = {
    title: "Check your self",
    desc: "Check how many dabs you or someone else has.\n" +
          "Shows your level and how many daily rolls you have.\n" +
          "*Check yourself before you wreck yourself.*",
    alias: ["check", "dabs", "info"],
    syntax: "`{prefix}{prefix}` Shows your info.\n" +
            "`{prefix}{prefix} @person` shows the persons info. *Actually not really.*",
    owner_only: false,
    affect_config: false,
    action: function(message, config) {
        if (message.mentions.members.size == 0)
            message.guild.members.fetch(message.author)
            .then(guildMember => message.channel.send("", build_embed(guildMember, config)))
        else
            message.mentions.members.map(
                guildMember => message.channel.send("", build_embed(guildMember, config))
            )
    }
}
