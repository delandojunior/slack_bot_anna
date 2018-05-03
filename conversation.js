/* conversation.js */

'use strict';
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var watsonAssistant = new AssistantV1({
    version: process.env.VERSION_DATE,
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD
  });


// new instance of Conversation

/**
 * Call to Conversation API: send message
 * 
 * @param {string} text 
 * @param {object} context 
 * @returns {promise}
 */
exports.sendMessage = (text, context) => {
  const payload = {
    workspace_id: process.env.WATSON_WORKSPACE_ID,
    input: {
      text: text
    },
    context: context
  };
  return new Promise((resolve, reject) => watsonAssistant.message(payload, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }));
};