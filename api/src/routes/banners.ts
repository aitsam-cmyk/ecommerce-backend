import { Router } from "express";
import { Banner } from "../models/Banner";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const banners = await Banner.find({ isActive: true }).sort({ order: 1 }).lean();
  return res.json(banners);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const created = await Banner.create(req.body);
  return res.status(201).json(created);
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const updated = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  return res.json(updated);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  return res.status(204).end();
});

export default router;
