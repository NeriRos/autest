import * as amqp from 'amqplib';
declare function createChannel(): Promise<{
    connection: amqp.Connection;
    channel: amqp.Channel;
}>;
export { createChannel, };
