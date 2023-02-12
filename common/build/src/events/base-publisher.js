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
exports.Publisher = void 0;
class Publisher {
    constructor(connection, channel) {
        this.connection = connection;
        this.channel = channel;
        // private getQueueName = () => `${this.groupName}:${this.subject}`;
        this.getQueueName = () => this.subject;
    }
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(this.getQueueName());
            const success = this.channel.sendToQueue(this.subject, this.parseData(data));
            return success;
        });
    }
    parseData(data) {
        return Buffer.from(JSON.stringify(data));
    }
}
exports.Publisher = Publisher;
