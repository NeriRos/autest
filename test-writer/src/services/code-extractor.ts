import OpenAI from "./openai";
import fs from "fs";

class CodeExtractor {
	private data: string;

	constructor(private path: string) {
		this.data = fs.readFileSync(path, "utf8");
	}

	getFileType() {}

	getElements() {
		return this.data;
	}

	async getStory() {
		try {
			// const response = await fetch("https://autest.dev:3000/api/storify/file", {
			// 	method: "POST",
			// 	body: JSON.stringify({ fileData: this.data }),
			// 	headers: {
			// 		"content-type": "application/json",
			// 	},
			// });

			// return await response.json();

			const ai = new OpenAI();

			const prompt = `
				Act as a code summorizer. Create a table with a row for each function with the following columns:
				1. name: function name.
				2. arguments: the arguments the function receives.
				3. return: what the function returns.
				4. goal: the goal of the function.

				File:
				${this.data}
			`;

			const result = await ai.execute(prompt);
			if (result) {
				const json = ai.tableToJson(
					result.choices
						.map((choice) => choice.text)
						.join()
						.trim(),
				);

				return json;
			}
		} catch (err) {
			console.log("Error getting story", err);
			return null;
		}
	}
}

export default CodeExtractor;
