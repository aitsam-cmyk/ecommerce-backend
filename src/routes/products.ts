import { Router } from "express";
import { Product } from "../models/Product";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const q: any = {};
    const { category, minPrice, maxPrice, minRating } = (_req.query as any) || {};
    if (category) q.category = category;
    if (minPrice || maxPrice) q.price = {};
    if (minPrice) q.price.$gte = Number(minPrice);
    if (maxPrice) q.price.$lte = Number(maxPrice);
    if (minRating) q.rating = { $gte: Number(minRating) };
    const products = await Product.find(q).limit(50).lean();
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

router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id).lean();
  if (!p) return res.status(404).json({ error: "Not found" });
  return res.json(p);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const created = await Product.create(req.body);
  return res.status(201).json(created);
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  return res.json(updated);
});

router.patch("/:id/stock", requireAuth, requireAdmin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, { inStock: req.body.inStock }, { new: true }).lean();
  return res.json(updated);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.status(204).end();
});

export default router;
