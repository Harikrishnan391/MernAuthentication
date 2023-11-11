import jwt from "jsonwebtoken";

const generateTokenAdmin = (res, adminId) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("adminJwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 100, //it calculate the seconds so the seconds converting to 30 days
  });
};

export default generateTokenAdmin;
