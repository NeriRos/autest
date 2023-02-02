import CodeExtractor from "../services/code-extractor";
import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "storage");
	},
	filename: function (req, file, cb) {
		// You could rename the file name
		// cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

		// You could use the original name
		cb(null, file.originalname);
	},
});

var upload = multer({ storage: storage });

const router = express.Router();

router.post(
	"/api/test-writer",
	upload.single("file"),
	async (req, res, next) => {
		try {
			if (req.file) {
				const extractor = new CodeExtractor(req.file.path);
				const story = await extractor.getStory();

				return res.json({ story });
			}
		} catch (err) {
			console.log("Can't read file", err);
			next(err);
		}

		res.json({ file: req.file });
	},
);

export { router as writer };
