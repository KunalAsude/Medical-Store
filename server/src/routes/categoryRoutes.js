import express from "express";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js"; // Import Product model

const router = express.Router();

/**
 * @desc   Get all categories
 * @route  GET /api/categories
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

/**
 * @desc   Get a single category by ID or slug
 * @route  GET /api/categories/:idOrSlug
 * @access Public
 */
router.get("/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    // Check if idOrSlug is a valid ObjectId
    const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);

    const category = await Category.findOne({
      $or: [isObjectId ? { _id: idOrSlug } : {}, { slug: idOrSlug }],
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
});

/**
 * @desc   Get medicines by category ID
 * @route  GET /api/categories/:categoryId/medicines
 * @access Public
 */
router.get("/:categoryId/products", async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Find products matching the category
    const products = await Product.find({ categories: categoryId });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
