import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
