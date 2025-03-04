import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * Uploads an image to Cloudinary.
 * @param {string} filePath - The local file path of the image.
 * @returns {Promise<string>} - Cloudinary URL.
 */
export const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Medi-Store",
    });

    fs.unlinkSync(filePath); // Remove local file after upload
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed");
  }
};
