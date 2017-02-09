const config = require('./config.json');
const amqp = require('amqplib/callback_api');
const gcm = require('node-gcm');

class PushSender {
  constructor() {
    //TODO: Connect with rabbitmq server and add callback
  }

  sendMessage(target, payload) {
    //TODO: Send push message to target via node-gcm
  }
}

const instance = new PushSender();
module.exports = exports = instance;

