import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connect successfully: ${conn.connection.host}`)
    }
    catch(e)
    {
        console.log("Mongodb connection error: ", e);
    }
}