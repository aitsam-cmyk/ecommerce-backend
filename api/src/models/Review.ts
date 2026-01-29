import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  productId: string;
  userId?: string;
  rating: number;
  content?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: String, required: true, index: true },
    userId: { type: String },
    rating: { type: Number, min: 1, max: 5, required: true },
    content: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
