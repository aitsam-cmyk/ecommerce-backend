import { Router } from "express";
import { Order } from "../models/Order";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const auth = (req as any).auth as { userId: string };
  const { items, paymentMethod, shippingAddress, paymentInfo } = req.body;
  const totalAmount = Array.isArray(items) ? items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0) : 0;
  const order = await Order.create({ userId: auth.userId, items, totalAmount, paymentMethod, paymentInfo, shippingAddress });
  return res.status(201).json(order);
});

router.get("/mine", requireAuth, async (req, res) => {
  const auth = (req as any).auth as { userId: string };
  const orders = await Order.find({ userId: auth.userId }).sort({ createdAt: -1 }).lean();
  return res.json(orders);
});

router.patch("/:id/status", requireAuth, requireAdmin, async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean();
  return res.json(updated);
});

router.patch("/:id/payment", requireAuth, async (req, res) => {
  const auth = (req as any).auth as { userId: string; role?: string };
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Not found" });
  }
  if (auth.role !== "admin" && order.userId !== auth.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }
  order.paymentInfo = {
    reference: req.body.reference,
    amount: req.body.amount,
    currency: req.body.currency,
    paidAt: req.body.paidAt ? new Date(req.body.paidAt) : order.paymentInfo?.paidAt,
    payerName: req.body.payerName,
    payerPhone: req.body.payerPhone,
    bankName: req.body.bankName,
    bankAccount: req.body.bankAccount,
    notes: req.body.notes
  };
  if (req.body.status) {
    order.status = req.body.status;
  }
  await order.save();
  return res.json(order.toObject());
});

export default router;
