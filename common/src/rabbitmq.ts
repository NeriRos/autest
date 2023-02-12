import * as amqp from 'amqplib'

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
}