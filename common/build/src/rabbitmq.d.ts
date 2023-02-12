import * as amqp from 'amqplib';
export declare function createChannel(): Promise<{
    connection: amqp.Connection;
    channel: amqp.Channel;
}>;
