import { Router } from "express";
import { Order } from "../models/Order";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const auth = (req as any).auth as { userId: string };
  const { items, paymentMethod, shippingAddress } = req.body;
  const totalAmount = Array.isArray(items) ? items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0) : 0;
  const order = await Order.create({ userId: auth.userId, items, totalAmount, paymentMethod, shippingAddress });
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

export default router;
