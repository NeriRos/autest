import { Channel, Connection, Message } from "amqplib";
import { BaseEvent } from "./base-event";
export declare abstract class Listener<T extends BaseEvent> {
    protected connection: Connection;
    protected channel?: Channel | undefined;
    abstract subject: T['subject'];
    abstract groupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    constructor(connection: Connection, channel?: Channel | undefined);
    protected listen(): Promise<import("amqplib").Replies.Consume>;
    protected parseMessage(msg: Message): any;
    private getQueueName;
}
