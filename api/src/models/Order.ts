import mongoose, { Schema, Document } from "mongoose";

export type PaymentMethod = "easypaisa" | "jazzcash" | "bank_transfer" | "cod";

export interface IOrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface IOrder extends Document {
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  shippingAddress?: string;
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String }
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["easypaisa", "jazzcash", "bank_transfer", "cod"], required: true },
    status: { type: String, enum: ["pending", "paid", "shipped", "delivered", "cancelled"], default: "pending" },
    shippingAddress: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
