import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { config } from "../setup";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Banner } from "../models/Banner";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { BankDetails } from "../models/BankDetails";
import { Payment } from "../models/Payment";

async function ensureCollections() {
  const names = ["users", "products", "categories", "banners", "orders", "payments", "bankdetails"];
  for (const n of names) {
    try {
      await mongoose.connection.createCollection(n);
    } catch (e) {
      void e;
    }
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const existing = await User.findOne({ email });
  if (existing) return;
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name: "Admin", email, passwordHash, role: "admin" });
}

async function seedCore() {
  const catCount = await Category.countDocuments();
  if (catCount === 0) {
    await Category.create([
      { name: "Fashion", slug: "fashion", description: "Clothing and accessories", isActive: true },
      { name: "Electronics", slug: "electronics", description: "Devices and gadgets", isActive: true }
    ]);
  }
  const bannerCount = await Banner.countDocuments();
  if (bannerCount === 0) {
    await Banner.create([
      { imageUrl: "https://images.unsplash.com/photo-1544972019-b8cf5f2c41b3?q=80&w=1200&auto=format&fit=crop", altText: "Fashion", order: 1, isActive: true },
      { imageUrl: "https://images.unsplash.com/photo-1511389026070-a14ae610a1bf?q=80&w=1200&auto=format&fit=crop", altText: "Electronics", order: 2, isActive: true }
    ]);
  }
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.create([
      {
        title: "Modern Hoodie",
        description: "Premium cotton hoodie",
        price: 49.99,
        imageUrl: "https://dummyimage.com/600x600/eee/aaa.jpg&text=Hoodie",
        category: "Fashion",
        inStock: true,
        rating: 4.6
      },
      {
        title: "Wireless Earbuds",
        description: "Noise-cancelling earbuds",
        price: 89.0,
        imageUrl: "https://dummyimage.com/600x600/eee/aaa.jpg&text=Earbuds",
        category: "Electronics",
        inStock: true,
        rating: 4.4
      }
    ]);
  }
}

async function main() {
  await config.connectDB();
  if (mongoose.connection.readyState !== 1) {
    console.log("Database not connected. Set MONGODB_URI.");
    process.exit(1);
  }
  await ensureCollections();
  await seedAdmin();
  await seedCore();
  await Order.createCollection();
  await Payment.createCollection();
  const bdCount = await BankDetails.countDocuments();
  if (bdCount === 0) {
    await BankDetails.create([
      { method: "easypaisa", accountTitle: "M. Aitsam", accountNumber: "03xx-xxxxxxx" },
      { method: "jazzcash", accountTitle: "M. Aitsam", accountNumber: "03xx-xxxxxxx" }
    ]);
  }
  console.log("Seeding completed.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
