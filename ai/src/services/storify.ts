import OpenAI from "./openai";

export async function storifyFile(fileData: string) {
    const ai = new OpenAI();

    const prompt = `
		Act as a code summarizer. Create a table with a row for each function with exactly 4 columns:
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
