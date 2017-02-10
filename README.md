# Pusher

## Quick start

0. `mv config.example.json config.json` and modify config.json
1. Install RabbitMQ (e.g. `brew install rabbitmq`)
2. Create user and set user's tag `management`.
3. `npm install`
4. pm2 start pm2.json

## Payload specification

Following is payload specification, when using Firebase Cloud Messaging.
```JSON
{
  "registrationTokens": "registrationToken[]",
  "title": "title-goes-here",
  "body": "body-goes-here",
  "data": {
    "key1": "value1", ...
  }
}
```

Test this with the following command. You have to replace parameters(e.g. vhost, ...) in respect of your configuration.

```shell
rabbitmqadmin publish routing_key="queue_name_goes_here" --vhost=vhost -u "username" -p "password" payload="payload"
```

## Extend message handling

This worker can be extended like `SMS notifier` and so fourth.

You may implement your message handler and put it under the `handler` directory.

Configuration should be in the `config.json` file.

