import { Router } from "express";
import { Review } from "../models/Review";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/:productId", async (req, res) => {
  const productId = String(req.params.productId);
  const list = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
  return res.json(list);
});

router.post("/:productId", requireAuth, async (req, res) => {
  const auth = (req as any).auth as { userId: string };
  const productId = String(req.params.productId);
  const created = await Review.create({
    productId,
    userId: auth.userId,
    rating: Number(req.body.rating),
    content: req.body.content
  });
  return res.status(201).json(created);
});

export default router;
