import express from "express";

const router = express.Router();

router.get("/api/storify/file", async (req, res) => {
	// const file = req.body.file;
	// const dataExtractor = new DataExtractor(file);
});

export { router as storify };
