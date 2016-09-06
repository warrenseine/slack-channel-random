var Slack = require('slack-node');

if (!process.env.SLACK_API_TOKEN)
    return console.error("missing environment variable SLACK_API_TOKEN");

var slack = new Slack(process.env.SLACK_API_TOKEN);

slack.api("emoji.list", function(err, response) {
    if (err)
        return console.error(err);

    var emojis = [];

    for (var emoji in response.emoji)
        emojis.push(emoji);

    var emoji = emojis[Math.floor(Math.random() * emojis.length)];

    slack.api("channels.list", function(err, response) {
        if (err)
            return console.error(err);

        var id = null;

        for (var channel in response.channels)
        {
            channel = response.channels[channel];

            if (channel.name == 'random')
                id = channel.id;
        }

        if (!id)
            return console.error("channel random doesn't exist");

        slack.api("channels.setTopic", {
            channel: id,
            topic: ':' + emoji + ':'
        }, function(err, response) {
            if (err)
                return console.error(err);

            console.log(response);
        });
    });
});
