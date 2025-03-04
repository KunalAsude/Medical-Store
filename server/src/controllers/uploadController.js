import { uploadImageToCloudinary } from "../utils/uploadImage.js";


/**
 * Uploads an image and returns the Cloudinary URL.
 * @param {Express.Request} req - The request object.
 * @returns {Promise<string>} - Cloudinary URL.
 */
export const uploadImage = async (req) => {
  if (!req.file) throw new Error("No file uploaded");

  const imageUrl = await uploadImageToCloudinary(req.file.path);
  return imageUrl;
};
