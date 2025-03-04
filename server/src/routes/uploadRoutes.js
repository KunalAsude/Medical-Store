import express from "express";
import upload from "../middleware/multer.js";



const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    res.json({ imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

export default router;
