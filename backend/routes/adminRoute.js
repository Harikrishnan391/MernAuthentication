const router = express.Router();

import express from "express";



import {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAllUsers,
  updateUserData,
  deleteUserData
} from "../controllers/adminController.js";

import { adminProtect } from "../middleware/adminAuthMiddleware.js";

router.post("/auth", authAdmin);

router.post("/", registerAdmin);

router.post("/logout", logoutAdmin);

router.get('/usersList',getAllUsers)

router.put('/update-user',updateUserData)

router.post('/delete-user',adminProtect,deleteUserData)


export default router;
