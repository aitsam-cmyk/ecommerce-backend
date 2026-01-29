import { Router } from "express";
import { Payment } from "../models/Payment";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const auth = (req as any).auth as { userId: string };
  const p = await Payment.create({
    orderId: String(req.body.orderId),
    method: String(req.body.method),
    amount: Number(req.body.amount),
    currency: req.body.currency || "PKR",
    status: "pending",
    reference: req.body.reference,
    walletNumber: req.body.walletNumber,
    bankName: req.body.bankName,
    bankAccount: req.body.bankAccount,
    proofImageUrl: req.body.proofImageUrl,
    payerName: req.body.payerName,
    payerPhone: req.body.payerPhone
  });
  return res.status(201).json(p);
});

router.get("/mine", requireAuth, async (req, res) => {
  const auth = (req as any).auth as { userId: string };
  const list = await Payment.find({ payerPhone: auth.userId }).sort({ createdAt: -1 }).lean();
  return res.json(list);
});

router.patch("/:id/status", requireAuth, requireAdmin, async (req, res) => {
  const updated = await Payment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean();
  return res.json(updated);
});

export default router;
