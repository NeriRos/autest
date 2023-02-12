export class Publisher {
    connection;
    channel;
    constructor(connection, channel) {
        this.connection = connection;
        this.channel = channel;
    }
    async publish(data) {
        await this.channel.assertQueue(this.getQueueName());
        const success = this.channel.sendToQueue(this.subject, this.parseData(data));
        return success;
    }
    parseData(data) {
        return Buffer.from(JSON.stringify(data));
    }
    // private getQueueName = () => `${this.groupName}:${this.subject}`;
    getQueueName = () => this.subject;
}
