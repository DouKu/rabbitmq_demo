const amqp = require('amqplib');

async function receiveMessge() {
  /** 连接url直接写在前端吧 */
  const connection = await amqp.connect('rabbit_mq_address');
  const channel = await connection.createChannel();
  channel.assertExchange('topic_logs', 'topic', {durable: false});
  const queue = await channel.assertQueue('', {exclusive: true});
  const key = 'a.1.1'

  channel.bindQueue(queue.queue, 'topic_logs', key);
  await channel.consume(queue.queue, (msg) => {
    console.log(msg.content.toString());
  }, {noAck: true});
};

receiveMessge();
