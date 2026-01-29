import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { Product } from "./models/Product";

dotenv.config();

async function main() {
  const uri = process.env.MONGODB_URI || "";
  if (!uri) {
    console.error("MONGODB_URI missing");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const filePath = path.join(process.cwd(), "seed", "products.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const docs = JSON.parse(raw);
  await Product.deleteMany({});
  const res = await Product.insertMany(docs);
  console.log(`Inserted ${res.length} products`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
