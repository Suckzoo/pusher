const config = require('../config.json').firebase
const gcm = require('node-gcm');

// message specification
// {
//   "registrationTokens": "registrationToken[]",
//   "title": "title-goes-here",
//   "body": "body-goes-here",
//   "data": {
//     "key1": "value1", ...
//   }
// }

const sender = new gcm.Sender(config.authorization);

function sendNotification(payload) {
  let {registrationTokens, title, body, data} = payload;
  let message = new gcm.Message({
    data,
    notification: {
      title,
      body
    }
  });
  sender.send(message, {registrationTokens}, (err, res) => {
    if (err) console.error(err);
    else console.log(res);
  });
}

module.exports = channel => (
  message => {
    if (message) {
      console.log(message.content.toString());
      sendNotification(JSON.parse(message.content.toString()));
      channel.ack(message);
    }
  }
)

