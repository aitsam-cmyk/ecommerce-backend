import mongoose, { Schema, Document } from "mongoose";

export type BankMethod = "easypaisa" | "jazzcash" | "bank_transfer";

export interface IBankDetails extends Document {
  method: BankMethod;
  accountTitle: string;
  accountNumber: string;
  iban?: string;
  bankName?: string;
  isActive: boolean;
  createdAt: Date;
}

const BankDetailsSchema = new Schema<IBankDetails>(
  {
    method: { type: String, enum: ["easypaisa", "jazzcash", "bank_transfer"], required: true },
    accountTitle: { type: String, required: true },
    accountNumber: { type: String, required: true },
    iban: { type: String },
    bankName: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const BankDetails = mongoose.model<IBankDetails>("BankDetails", BankDetailsSchema);
