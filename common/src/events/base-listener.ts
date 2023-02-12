import {Subjects} from './subjects';
import {Channel, Connection, Message} from "amqplib";
import {strict as assert} from "assert";
import {BaseEvent} from "./base-event";

export abstract class Listener<T extends BaseEvent> {
    abstract subject: T['subject'];
    abstract groupName: string;

    abstract onMessage(data: T['data'], msg: Message): void;

    constructor(protected connection: Connection, protected channel?: Channel) {
        if (!channel) {
            connection.createChannel().then((channel) => {
                this.channel = channel

                this.listen()
            });
        }
    }

    protected async listen() {
        if (!this.channel)
            throw new Error("Channel is not defined")

        await this.channel.assertQueue(this.getQueueName());

        return this.channel.consume(this.subject, async (msg) => {
            if (msg !== null) {
                console.log(`Message received: ${this.subject} / ${this.subject}`);
                const parsedData = this.parseMessage(msg);
                this.onMessage(parsedData, msg);
            }
        }, {
            noAck: false
        });
    }

    protected parseMessage(msg: Message) {
        return JSON.parse(msg.content.toString('utf8'));
    }

    // private getQueueName = () => `${this.groupName}:${this.subject}`;
    private getQueueName = () => this.subject;
}
