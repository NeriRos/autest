"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SpecificSubjects = exports.Subjects = exports.Publisher = exports.Listener = exports.createChannel = void 0;
const amqp = __importStar(require("amqplib"));
const base_listener_1 = require("./events/base-listener");
Object.defineProperty(exports, "Listener", { enumerable: true, get: function () { return base_listener_1.Listener; } });
const base_publisher_1 = require("./events/base-publisher");
Object.defineProperty(exports, "Publisher", { enumerable: true, get: function () { return base_publisher_1.Publisher; } });
const subjects_1 = require("./events/subjects");
Object.defineProperty(exports, "Subjects", { enumerable: true, get: function () { return subjects_1.Subjects; } });
const SpecificSubjects = __importStar(require("./events/specific-subjects"));
exports.SpecificSubjects = SpecificSubjects;
function createChannel() {
    return __awaiter(this, void 0, void 0, function* () {
        const host = process.env.RABBITMQ_HOST;
        const username = process.env.RABBITMQ_USERNAME;
        const password = process.env.RABBITMQ_PASSWORD;
        const url = `amqp://${username}:${password}@${host}`;
        const connection = yield amqp.connect(url);
        const channel = yield connection.createChannel();
        return {
            connection,
            channel
        };
    });
}
exports.createChannel = createChannel;
