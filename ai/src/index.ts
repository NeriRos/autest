import express, { application } from "express";

import { storify } from "./routes/storify";

const app = express();

app.use(express.json());
app.use(storify);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
