import {Listener, Subjects, CodeStorifiedEvent} from "@autest/common-v2";
import {Channel, Connection, Message} from "amqplib";

export class CodeStorifiedListener extends Listener<CodeStorifiedEvent> {
    groupName = "code_storified";

    subject: Subjects.CodeStorified = Subjects.CodeStorified

    constructor(connection: Connection, channel: Channel) {
        super(connection, channel);
    }

    async onMessage(data: CodeStorifiedEvent['data'], msg: Message) {
        console.log("GOT Story", data)
        this.channel!.ack(msg)
    }
}
