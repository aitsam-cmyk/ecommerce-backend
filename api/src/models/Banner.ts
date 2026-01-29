import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  imageUrl: string;
  altText?: string;
  linkUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    imageUrl: { type: String, required: true },
    altText: { type: String },
    linkUrl: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Banner = mongoose.model<IBanner>("Banner", BannerSchema);
