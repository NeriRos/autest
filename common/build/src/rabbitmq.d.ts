import * as amqp from 'amqplib';
import { Listener } from './events/base-listener';
import { Publisher } from './events/base-publisher';
import { Subjects } from './events/subjects';
import * as Events from './events/specific-events';
declare function createChannel(): Promise<{
    connection: amqp.Connection;
    channel: amqp.Channel;
}>;
export { createChannel, Listener, Publisher, Subjects, Events };
