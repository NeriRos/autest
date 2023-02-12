import express from "express";
import multer from "multer";
import {createChannel} from '@autest/common-v2'
import {Channel, Connection} from "amqplib";
import {strict as assert} from 'node:assert';
import {FileUploadPublisher} from "../publishers/file-upload-publisher";

let connection: Connection, channel: Channel;

createChannel().then(async ({connection: conn, channel: ch}) => {
    connection = conn;
    channel = ch;

    console.log("Connected to channel")
})


async function publishFileUpload(fileBuffer: Buffer) {
    const publisher = new FileUploadPublisher(connection, channel);
    const file = fileBuffer.toString('utf-8')

    const result = await publisher.publish({
        file
    });

    console.log("Published", result)

    // assert.notEqual(channel, undefined, 'Channel is undefined');
    //
    // await channel.assertQueue(queue);
    //
    // channel.sendToQueue(queue, fileBuffer);
}


const storage = multer.memoryStorage()
var upload = multer({storage: storage});

const router = express.Router();

router.post(
    "/api/test-writer",
    upload.single("file"),
    async (req, res, next) => {
        try {
            if (req.file) {
                await publishFileUpload(req.file.buffer)

                return res.status(200).json({test: "tt"});
            }
        } catch (err) {
            console.log("Can't read file", err);
        }

        res.status(400);
    }
);

export {router as writer};
