import CodeExtractor from "../services/code-extractor";
import axios from "axios";
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
        const test = await axios.get(
          "http://ingress-external/api/ai/storify/file",
          {
            headers: {
              Host: "autest.dev",
            },
          }
        );
        console.log(test.data);
        return res.status(200).json({ test: "tt" });
      }
    } catch (err) {
      console.log("Can't read file", err);
    }

    res.status(400);
  }
);

export { router as writer };
