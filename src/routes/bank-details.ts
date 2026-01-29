import { Router } from "express";
import { BankDetails } from "../models/BankDetails";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const list = await BankDetails.find({ isActive: true }).lean();
  return res.json(list);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const created = await BankDetails.create(req.body);
  return res.status(201).json(created);
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const updated = await BankDetails.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  return res.json(updated);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await BankDetails.findByIdAndDelete(req.params.id);
  return res.status(204).end();
});

export default router;
