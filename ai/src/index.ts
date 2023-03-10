import express from "express";
import { storify } from "./routes/ai-storify";

const app = express();

app.use(express.json());
app.use(storify);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
