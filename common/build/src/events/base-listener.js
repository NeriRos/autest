"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(connection, channel) {
        this.connection = connection;
        this.channel = channel;
        // private getQueueName = () => `${this.groupName}:${this.subject}`;
        this.getQueueName = () => this.subject;
        connection.createChannel().then((channel) => {
            this.channel = channel;
            this.listen();
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel)
                throw new Error("Channel is not defined");
            yield this.channel.assertQueue(this.getQueueName());
            return this.channel.consume(this.subject, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg !== null) {
                    console.log(`Message received: ${this.subject} / ${this.subject}`);
                    const parsedData = this.parseMessage(msg);
                    this.onMessage(parsedData, msg);
                }
            }), {
                noAck: false
            });
        });
    }
    parseMessage(msg) {
        return JSON.parse(msg.content.toString('utf8'));
    }
}
exports.Listener = Listener;
