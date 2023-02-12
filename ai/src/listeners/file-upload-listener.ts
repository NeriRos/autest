import {Listener, Subjects, FileUploadEvent} from "@autest/common-v2";
import {queueGroupName} from "./queue-group-name";
import {Channel, Connection, Message} from "amqplib";

export class FileUploadListener extends Listener<FileUploadEvent> {
    groupName = queueGroupName;

    subject = Subjects.FileUpload

    constructor(connection: Connection, channel: Channel) {
        super(connection, channel);
    }

    async onMessage(data: FileUploadEvent['data'], msg: Message) {
        console.log(data)
        // Find the ticket that the order is reserving
        // this.channel =
        //     msg.ack();
    }

}
