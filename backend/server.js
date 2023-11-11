import express from "express";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoute.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("backend/public"));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
