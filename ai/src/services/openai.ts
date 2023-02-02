import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	organization: "org-tG6hzns9pMBjLdXS0fpy115a",
	apiKey: "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",
});

const openai = new OpenAIApi(configuration);

class OpenAI {
	private readonly model = "text-davinci-003";
	private settings: OpenAISettings;

	constructor(settings?: OpenAISettings) {
		this.settings = settings || {
			frequency_penalty: 0.1,
			presence_penalty: 0.1,
			top_p: 0.9,
			max_tokens: 3000,
			temperature: 0.8,
			best_of: 2,
		};
	}

	async execute(prompt: string) {
		try {
			const response = await openai.createCompletion({
				model: this.model,
				prompt,
				...this.settings,
			});

			return {
				...response.data,
			};
		} catch (e) {
			console.log(e);
			return e;
		}
	}
}

export interface OpenAISettings {
	frequency_penalty: number;
	presence_penalty: number;
	top_p: number;
	max_tokens: number;
	temperature: number;
	best_of: number;
}

export default OpenAI;
