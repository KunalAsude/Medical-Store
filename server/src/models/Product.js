import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    costPrice: { type: Number, required: true },

    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],

    brand: { type: String, required: true },
    manufacturer: { type: String, required: true },
    ingredients: { type: String, required: true },
    dosage: { type: String, required: true },
    sideEffects: { type: String },
    warnings: { type: String },

    weight: { type: Number },

    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },

    isActive: { type: Boolean, default: true },
    isOTC: { type: Boolean, default: false },
    requiresPrescription: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },

    tags: [{ type: String }],

    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],

    variants: [
      {
        variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        sku: { type: String, required: true },
        price: { type: Number, required: true },
        isDefault: { type: Boolean, default: false },
      },
    ],

    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },

    stockQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);
