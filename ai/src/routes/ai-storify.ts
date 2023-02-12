import OpenAI from "../services/openai";
import express from "express";
import {createChannel} from '@autest/common-v2'
import {Channel, Connection} from "amqplib";
import {FileUploadListener} from "../listeners/file-upload-listener";
import {storifyFile} from '../services/storify'

let connection: Connection, channel: Channel;

createChannel().then(async ({connection: conn, channel: ch}) => {
    connection = conn;
    channel = ch;

    console.log("Connected to channel")

    await subscribeFileUpload()
})

async function subscribeFileUpload() {
    const queue = 'file_upload';

    const listener = new FileUploadListener(connection, channel)
}

const router = express.Router();

router.post("/api/ai/storify/file", async (req, res, next) => {

    const fileData = req.body.fileData;

    const story = await storifyFile(fileData)

    if (story) {
        return res.json({story});
    }

    return res.status(400).json({story: null});
});

export {router as storify};
