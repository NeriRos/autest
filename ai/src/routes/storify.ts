import OpenAI from "../services/openai";
import express from "express";

const router = express.Router();
router.get("/api/ai/storify/file", async (req, res, next) => {
	res.json({ test: "Tete" });
});

router.post("/api/ai/storify/file", async (req, res, next) => {
	const ai = new OpenAI();

	const functions = req.body.functions;

	const prompt = `
		Act as a code summorizer. Create a table with a row for each function with the following columns:
		1. name: function name.
		2. arguments: the arguments the function receives.
		3. return: what the function returns.
		4. goal: the goal of the function.

		Functions:
		${functions.join(`
		
		`)}
	`;

	const result = await ai.execute(prompt);

	res.json({ result });
});

export { router as storify };
