import {BaseEvent} from "./base-event";
import {Channel, Connection} from "amqplib";

export abstract class Publisher<T extends BaseEvent> {
    abstract subject: T['subject'];

    constructor(private connection: Connection, private channel: Channel) {
    }

    async publish(data: T['data']) {
        await this.channel.assertQueue(this.getQueueName());

        const success = this.channel.sendToQueue(this.subject, this.parseData(data))

        return success;
    }

    private parseData(data: T['data']) {
        return Buffer.from(JSON.stringify(data))
    }

    // private getQueueName = () => `${this.groupName}:${this.subject}`;
    private getQueueName = () => this.subject;
}
