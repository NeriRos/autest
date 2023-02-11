import * as amqp from 'amqplib'

async function connectRabbitMQ() {
    const host = process.env.RABBITMQ_HOST
    const username = process.env.RABBITMQ_USERNAME;
    const password = process.env.RABBITMQ_PASSWORD;
    const url = `amqp://${username}:${password}@${host}`

    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    console.log("Listening on RabbitMQ")

    return {
        connection,
        channel
    }
}

export {
    connectRabbitMQ
}