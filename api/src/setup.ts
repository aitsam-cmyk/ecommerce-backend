import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

export const config = {
  async connectDB() {
    if (!MONGODB_URI) {
      console.warn("MONGODB_URI not set. Starting without database connection.");
      return;
    }
    await mongoose.connect(MONGODB_URI);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  },
  jwtSecret: process.env.JWT_SECRET as string,
  stripeKey: process.env.STRIPE_SECRET_KEY || ""
};
