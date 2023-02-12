export class Listener {
    connection;
    channel;
    constructor(connection, channel) {
        this.connection = connection;
        this.channel = channel;
        connection.createChannel().then((channel) => {
            this.channel = channel;
            this.listen();
        });
    }
    async listen() {
        if (!this.channel)
            throw new Error("Channel is not defined");
        await this.channel.assertQueue(this.getQueueName());
        return this.channel.consume(this.subject, async (msg) => {
            if (msg !== null) {
                console.log(`Message received: ${this.subject} / ${this.subject}`);
                const parsedData = this.parseMessage(msg);
                this.onMessage(parsedData, msg);
            }
        }, {
            noAck: true
        });
    }
    parseMessage(msg) {
        return JSON.parse(msg.content.toString('utf8'));
    }
    // private getQueueName = () => `${this.groupName}:${this.subject}`;
    getQueueName = () => this.subject;
}
