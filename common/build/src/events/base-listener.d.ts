import { Channel, Connection, Message } from "amqplib";
import { BaseEvent } from "./base-event";
export declare abstract class Listener<T extends BaseEvent> {
    private connection;
    abstract subject: T['subject'];
    abstract groupName: string;
    protected channel?: Channel;
    abstract onMessage(data: T['data'], msg: Message): void;
    constructor(connection: Connection, channel?: Channel);
    protected listen(): Promise<import("amqplib").Replies.Consume>;
    protected parseMessage(msg: Message): any;
    private getQueueName;
}
