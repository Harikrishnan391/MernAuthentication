//for using router need to import the  router from express
const router = express.Router();
import express from "express";
import multer from "multer"
import path from "path"
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/public/userImage");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect,upload.single('file'),updateUserProfile);
export default router;
