import OpenAI from "../services/openai";
import express from "express";
import {createChannel} from '@autest/common-v2'
import {Channel, Connection} from "amqplib";
import {FileUploadListener} from "../listeners/file-upload-listener";

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
    // await listenQueue(channel, queue, async (msg) => {
    //     const fileData = msg.content.toString();
    //     const story = await storifyFile(fileData)
    //
    //     console.log("STORY", story)
    //
    //     channel.ack(msg);
    // })
}

async function storifyFile(fileData: string) {
    const ai = new OpenAI();

    const prompt = `
		Act as a code summorizer. Create a table with a row for each function with exactly 4 columns:
		1. name: function name.
		2. arguments: the arguments the function receives.
		3. return: what the function returns.
		4. goal: the goal of the function.

		Code file:
		${fileData}
	`;

    const result = await ai.execute(prompt);

    if (result) {
        const text = result.choices.map((choice) => choice.text).join();
        const json = ai.tableToJson(text);

        return json
    }
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
