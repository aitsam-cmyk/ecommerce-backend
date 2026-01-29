import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating?: number;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    rating: { type: Number }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
