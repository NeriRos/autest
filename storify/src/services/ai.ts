class StoryAI {
	providerBaseUrl = "https://ai-srv:3000/api/ai";

	// rome-ignore lint/suspicious/noExplicitAny: Temp
	async file(functions: string[]): Promise<any> {
		const res = await fetch(`${this.providerBaseUrl}/file`, {
			method: "POST",
			body: JSON.stringify({ functions }),
			headers: { "content-type": "application/json" },
		});

		return res.json();
	}
}
