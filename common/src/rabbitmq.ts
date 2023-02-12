import * as amqp from 'amqplib'
import {Listener} from './events/base-listener';
import {Publisher} from './events/base-publisher';
import {Subjects} from './events/subjects'
import * as Events from './events/specific-events'

async function createChannel() {
    const host = process.env.RABBITMQ_HOST
    const username = process.env.RABBITMQ_USERNAME;
    const password = process.env.RABBITMQ_PASSWORD;
    const url = `amqp://${username}:${password}@${host}`

    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    return {
        connection,
        channel
    }
}

export {
    createChannel,
    Listener,
    Publisher,
    Subjects,
    Events
}