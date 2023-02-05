import OpenAI from "../services/openai";
import express from "express";

const router = express.Router();
console.log("teadsadsddas")
router.get("/api/ai/storify/file", async (req, res, next) => {
  res.status(200).json({ test: "Tete" });
});

router.post("/api/ai/storify/file", async (req, res, next) => {
  const ai = new OpenAI();

  const fileData = req.body.fileData;

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

    return res.json({ result: json });
  }

  return res.status(400).json({ result: null });
});

export { router as storify };
