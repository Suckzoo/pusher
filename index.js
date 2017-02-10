const config = require('./config.json');
const handler = require('./handler/push-notifier');
const amqp = require('amqplib');

const USER = config.rabbitmq.username;
const PASS = config.rabbitmq.password;
const HOST = config.rabbitmq.host;
const PORT = config.rabbitmq.port;
const VHOST = config.rabbitmq.vhost;
const RABBITMQ_URI = `amqp://${USER}:${PASS}@${HOST}`
                  + `${PORT ? `:${PORT}` : ''}/${VHOST}`

function listen() {
  let connection;
  let channel;
  let messageHandler;
  amqp.connect(RABBITMQ_URI).then(_connection => {
    console.log('RabbitMQ successfully connected');
    connection = _connection;
    return connection.createChannel()
  }).then(_channel => {
    console.log('Channel successfully created');
    channel = _channel;
    messageHandler = handler(channel);
    return channel.assertQueue(config.rabbitmq.queue)
  }).then(ok => {
    console.log('Queue successfully asserted');
    console.log('Now consuming messages...');
    return channel.consume(config.rabbitmq.queue, messageHandler)
  }).catch(err => {
    console.log(err);
  });
}

listen();

