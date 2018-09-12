const amqp = require('amqplib');

async function receiveMessge() {
  /** 连接url直接写在前端吧 */
  const connection = await amqp.connect('rabbitmq_address');
  const channel = await connection.createChannel();
  channel.assertExchange('topic_logs', 'topic', {durable: false});
  const queue = await channel.assertQueue('', {exclusive: true});
  const key = 'a.1.2' // 这个与receiver不一样就是为了这个接收不到对应的推流消息

  channel.bindQueue(queue.queue, 'topic_logs', key);

  await channel.consume(queue.queue, (msg) => {
    console.log(msg.content.toString());
  }, {noAck: true});
};

receiveMessge();
