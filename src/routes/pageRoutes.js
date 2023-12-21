import express from "express";
import { authMiddleWare } from "../middleware/authMiddleWare.js";
import { getPages, createPage } from "../controllers/pageController.js";
const router = express();
import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });
router.post("/create-page", upload.single("image"), authMiddleWare, createPage);
router.get("/get-page/:id", authMiddleWare, getPages);

export default router;
