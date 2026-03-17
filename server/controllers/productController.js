import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {

    console.log("Files:", req.files);

    const productData = JSON.parse(req.body.productData);

    const image1 = req.files.image1 ? req.files.image1[0] : null;
    const image2 = req.files.image2 ? req.files.image2[0] : null;
    const image3 = req.files.image3 ? req.files.image3[0] : null;
    const image4 = req.files.image4 ? req.files.image4[0] : null;

    const images = [image1, image2, image3, image4].filter((item) => item !== null);

    if (images.length === 0) {
      return res.json({
        success: false,
        message: "Please upload at least one image"
      });
    }

    let imagesUrl = [];

    for (const item of images) {

      // ✅ DEBUG LINE — YAHAN ADD KARO
      console.log("Uploading image to Cloudinary:", item.path);

      const result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image"
      });

      console.log("Cloudinary Response:", result); // ✅ DEBUG

      imagesUrl.push(result.secure_url);
    }

    await Product.create({
      ...productData,
      image: imagesUrl
    });

    res.json({
      success: true,
      message: "Product Added Successfully"
    });

  } catch (error) {

    // ✅ DEBUG ERROR
    console.log("PRODUCT ERROR FULL:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==============================
// GET ALL PRODUCTS
// ==============================

export const productList = async (req, res) => {
  try {

    const products = await Product.find({});

    res.json({
      success: true,
      products
    });

  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });
  }
};

// ==============================
// GET PRODUCT BY ID
// ==============================

export const productById = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Product.findById(id);

    res.json({
      success: true,
      product
    });

  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });
  }
};

// ==============================
// CHANGE STOCK
// ==============================

export const changeStock = async (req, res) => {
  try {

    const { id, inStock } = req.body;

    await Product.findByIdAndUpdate(id, { inStock });

    res.json({
      success: true,
      message: "Stock Updated"
    });

  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });
  }
};




