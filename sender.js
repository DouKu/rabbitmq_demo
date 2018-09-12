const amqp = require('amqplib');

async function connection() {
  const connection = await amqp.connect('amqp://photolive:photolive@119.23.209.4:5672');
  const channel = await connection.createChannel();
  channel.assertExchange('topic_logs', 'topic', {durable:false});
  return channel;
}

function sendMessage(channel, Msg) {
  const key = 'album.live.1';
  channel.publish('topic_logs', key, Buffer.from(Msg));
};

connection().then((channel) => {
  setInterval(() => {
    const a = {
      fuck: "lgybetter",
      handsome: "qill"
    };
    sendMessage(channel, JSON.stringify(a));
  }, 1000);
}).catch(err => {
  console.log(err)
})
