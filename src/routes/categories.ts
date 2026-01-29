import { Router } from "express";
import { Category } from "../models/Category";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const categories = await Category.find({ isActive: true }).lean();
  return res.json(categories);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const created = await Category.create(req.body);
  return res.status(201).json(created);
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  return res.json(updated);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  return res.status(204).end();
});

export default router;
