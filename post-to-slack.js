

exports.postToSlack = function (msg) {

var Slack = require('slack-node');

webhookUri = "";

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