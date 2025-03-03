import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * @desc   Get all products
 * @route  GET /api/products
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

/**
 * @desc   Get a single product by ID or slug
 * @route  GET /api/products/:idOrSlug
 * @access Public
 */
router.get("/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const product = await Product.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

export default router;
