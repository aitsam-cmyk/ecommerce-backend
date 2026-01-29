import mongoose, { Schema, Document } from "mongoose";
import { PaymentMethod } from "./Order";

export type PaymentStatus = "pending" | "verified" | "failed";

export interface IPayment extends Document {
  orderId: string;
  method: PaymentMethod;
  amount: number;
  currency: string;
  status: PaymentStatus;
  reference?: string;
  walletNumber?: string;
  bankName?: string;
  bankAccount?: string;
  proofImageUrl?: string;
  payerName?: string;
  payerPhone?: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: { type: String, required: true, index: true },
    method: { type: String, enum: ["easypaisa", "jazzcash", "bank_transfer", "cod"], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "PKR" },
    status: { type: String, enum: ["pending", "verified", "failed"], default: "pending", index: true },
    reference: { type: String },
    walletNumber: { type: String },
    bankName: { type: String },
    bankAccount: { type: String },
    proofImageUrl: { type: String },
    payerName: { type: String },
    payerPhone: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
