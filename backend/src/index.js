import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookiePareser from "cookie-parser";
import { connectDB } from "./lib/db.js";

dotenv.config()
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(cookiePareser())

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT , () => {
    console.log(`server is running on ${PORT}`);
    connectDB()
})