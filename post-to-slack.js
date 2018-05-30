

exports.postToSlack = function (msg) {
 //   console.log(msg);
//     const { IncomingWebhook } = require('@slack/client');
//     const url = 'https://hooks.slack.com/services/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';
//     const webhook = new IncomingWebhook(url);
// // Send simple text to the webhook channel
// webhook.send(msg, function(err, res) {
//     if (err) {
//         console.log('Error:', err);
//     } else {
//         console.log('Message sent: ', res);
//     }
// });


var Slack = require('slack-node');

webhookUri = "https://hooks.slack.com/services/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";

slack = new Slack();
slack.setWebhook(webhookUri);

slack.webhook({
 channel: "#ai-logicsoftonline",
 username: "asad",
 text: "@Query: "+msg.resolvedQuery+"\n @BotResponse: "+msg.fulfillment.speech
}, function(err, response) {
 console.log(response);
});

}