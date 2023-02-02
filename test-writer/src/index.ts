import express from "express";
import { writer } from "./routes/writer";

const app = express();

app.use(express.json());
app.use(writer);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
