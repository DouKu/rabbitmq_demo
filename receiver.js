const amqp = require('amqplib');

async function receiveMessge() {
  /** 连接url直接写在前端吧 */
  const connection = await amqp.connect('amqp://photolive:photolive@119.23.209.4:5672');
  const channel = await connection.createChannel();
  channel.assertExchange('topic_logs', 'topic', {durable: false});
  const queue = await channel.assertQueue('', {exclusive: true});
  // 注意这里就是微信端连接的关键
  // key为随意配置规则暂定为'album.live.AlbumId'
  const key = 'album.live.1'

  channel.bindQueue(queue.queue, 'topic_logs', key);
  await channel.consume(queue.queue, (msg) => {
    console.log(msg.content.toString());
  }, {noAck: true});
};

receiveMessge();
