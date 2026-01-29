import { Router } from "express";
import { Product } from "../models/Product";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const products = await Product.find().limit(50).lean();
    return res.json(products);
  } catch {
    // when DB is not configured, return sample products
    return res.json([
      {
        _id: "demo1",
        title: "Modern Hoodie",
        description: "Premium cotton hoodie with minimalist design",
        price: 49.99,
        imageUrl: "/placeholder/hoodie.jpg",
        category: "Fashion",
        inStock: true,
        rating: 4.6
      },
      {
        _id: "demo2",
        title: "Wireless Earbuds",
        description: "Noise-cancelling earbuds with long battery life",
        price: 89.0,
        imageUrl: "/placeholder/earbuds.jpg",
        category: "Electronics",
        inStock: true,
        rating: 4.4
      }
    ]);
  }
});

export default router;
