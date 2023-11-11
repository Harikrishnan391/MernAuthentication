import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateTokenAdmin from "../utils/generateTokenAdmin.js";

import destroyAdminToken from "../utils/destroyAdminToken.js";

import {
  fetchAllUsers,
  updateUser,
  deleteUser,
} from "../helpers/adminHelpers.js";

// import {
//   fetchAllUsers,
//   updateUser,
//   deleteUser,
// } from "../helpers/adminHelpers.js";

// ========================desc - Auth admin/set token========================
//========================route - POST api/admin/auth========================
//========================access- public========================

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateTokenAdmin(res, admin._id);

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, key } = req.body;

  const adminExist = await Admin.findOne({ email });

  if (adminExist) {
    res.status(400);
    throw new Error("Admin already exist");
  }

  console.log(key, "keyyyyyy");
  if (key !== process.env.ADMIN_KEY) {
    res.status(401);
    throw new Error("Invalid key");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    generateTokenAdmin(res, admin._id);

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid admin data");
  }
});

// ========================desc - Logout admin========================
//========================route - POST api/admin/logout========================
//========================access- public========================

const logoutAdmin = asyncHandler(async (req, res) => {
  
  destroyAdminToken(res)

  res.status(200).json({ message: "Logged out" });
});

// ========================desc - list user details========================
//========================route - GET api/admin/usersList========================
//========================access- private========================

const getAllUsers = asyncHandler(async (req, res) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.log(error);
    });
});

const updateUserData = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;

  if (!userId) {
    res.status(404);

    throw new Error("UserId not received in request.User update failed");
  }

  const userData = { userId: userId, name: name, email: email };
  const usersUpdateStatus = await updateUser(userData);

  if (usersUpdateStatus.success) {
    const response = usersUpdateStatus.message;
    res.status(200).json({ message: response });
  } else {
    res.status(404);
    throw new Error("User update failed");
  }
});

const deleteUserData = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const usersDeleteStatus = await deleteUser(userId);

  if (usersDeleteStatus.success) {
    const response = usersDeleteStatus.message;
    res.statusb(200).json({ message: response });
  } else {
    res.status(404);
    const response = usersDeleteStatus.message;
    throw new Error(response);
  }
});

export {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAllUsers,
  updateUserData,
  deleteUserData,
};
