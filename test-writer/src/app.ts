import express from "express";
import { writer } from "./routes/writer";

const app = express();

app.use(express.json());
app.use(writer);

export { app };
