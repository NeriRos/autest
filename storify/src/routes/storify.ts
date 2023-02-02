import express from "express";

const router = express.Router();

router.post("/api/storify/file", async (req, res, next) => {
	const fileData = req.body.fileData;

	console.log("Received file");

	try {
		const ai = new StoryAI();
		const result = await ai.file(fileData);

		console.log(result);
		
		res.json({ result });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

export { router as storify };
