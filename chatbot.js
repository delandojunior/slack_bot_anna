/* chatbots.js */
'use strict';
const Botkit       = require('botkit');
var env = require('node-env-file');
env(__dirname+'/.env');
// use the tokens you got from the previous step
const slack_token  = process.env.SLACK_OAUTH;
const slack_oauth  = process.env.SLACK_OAUTH;
const Conversation = require('./conversation');

var contexto = {};


exports.init = {
	/**
	 * Starts Slack-Bot
	 *
	 * @returns {*}
	 */
	slackBot() {
		console.log('Inicializando chatbot');
		// initialisation
		const slackController = Botkit.slackbot({
			// optional: wait for a confirmation events for each outgoing message before continuing to the next message in a conversation
			require_delivery: true
		});
		const slackBot = slackController.spawn(
		{
			token: slack_token
		}
		);
		// create rtm connection
		slackBot.startRTM((err, bot, payload) => {
			if (err) {
				throw new Error('Could not connect to Slack');
			}
			slackController.log('Slack connection established.');
			console.info("slack conectado");

		});
		// listener that handles incoming messages
		slackController.hears(['.*'], ['direct_message', 'direct_mention','metion'], (bot, message) => {
			console.log(message)

			var key_user = message.channel+message.user;
			console.log('Usuário' + key_user);
			console.log('contextooo ' + contexto[key_user]);

			// if(!contexto[key_user]){
			// 	console.log('usuário sem contexto');
			// 	contexto[key_user] = undefined;
			// }
			Conversation.sendMessage(String(message.text), contexto[key_user]) // at first message the context is still undefined
				.then(response => {
					slackController.log('Response from Watson received');
					console.log('quase que funciona');
					console.log(response);
					// do something here and then reply to the user through slack
					// note: Watson's response text is stored in "response.output.text"
					// ("join('\n')" is for cases when the response is multiline)
					contexto[key_user] = response.context;
					bot.reply(message, response.output.text.join('\n'));
				})
				.catch(err => {
					console.log(err);
					console.error(JSON.stringify(err, null, 2));
				});
		});
	}
};