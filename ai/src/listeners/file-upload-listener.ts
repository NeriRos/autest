import {Listener, Subjects, FileUploadEvent} from "@autest/common-v2";
import {queueGroupName} from "./queue-group-name";
import {Channel, Connection, Message} from "amqplib";
import {storifyFile} from "../services/storify";
import {CodeStorifiedPublisher} from "../publishers/code-storified-publisher";

export class FileUploadListener extends Listener<FileUploadEvent> {
    groupName = queueGroupName;

    subject: Subjects.FileUpload = Subjects.FileUpload

    constructor(connection: Connection, channel: Channel) {
        super(connection, channel);
        this.channel = channel;
    }

    async onMessage(data: FileUploadEvent['data'], msg: Message) {
        const story = await storifyFile(data.file)
        if (story) {
            const publisher = new CodeStorifiedPublisher(this.connection, this.channel!);
            await publisher.publish({
                story
            })
            this.channel!.ack(msg)
        }
    }

}
