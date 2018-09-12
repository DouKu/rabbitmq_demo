const amqp = require('amqplib');

async function connection() {
  const connection = await amqp.connect('rabbitmq_address');
  const channel = await connection.createChannel();
  channel.assertExchange('topic_logs', 'topic', {durable:false});
  return channel;
}

function sendMessage(channel, Msg) {
  const key = 'a.1.1';
  channel.publish('topic_logs', key, Buffer.from(Msg));
};

connection().then((channel) => {
  setInterval(() => {
    const a = {
      normal: "lgybetter",
      handsome: "qill"
    };
    sendMessage(channel, JSON.stringify(a));
  }, 1000);
}).catch(err => {
  console.log(err)
})
