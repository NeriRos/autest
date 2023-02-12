import { BaseEvent } from "./base-event";
import { Channel, Connection } from "amqplib";
export declare abstract class Publisher<T extends BaseEvent> {
    private connection;
    private channel;
    abstract subject: T['subject'];
    abstract groupName: string;
    constructor(connection: Connection, channel: Channel);
    publish(data: T['data']): Promise<boolean>;
    private parseData;
    private getQueueName;
}
