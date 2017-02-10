const gcm = require('node-gcm');

module.exports = channel => (
  message => {
    if (message) {
      console.log(message.content.toString());
      channel.ack(message);
    }
  }
)
