import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteproductController,
  filterProductController,
  getProductController,
  productCategoryController,
  productCountController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes
// Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Get Product
router.get("/get-product", getProductController);

// Get Single Product
router.get("/get-product/:slug", singleProductController);

// Product Photo
router.get("/product-photo/:pid", productPhotoController);

// Delete Product
router.delete("/delete-product/:pid", deleteproductController);

// Filter Product
router.post("/product-filter", filterProductController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// search products
router.get("/search/:keyword", searchProductController);

// related products
router.get("/related-product/:pid/:cid", relatedProductController);

// Category wise products
router.get("/product-category/:slug", productCategoryController);

// Payment Route
// Token
router.get("/braintree/token", braintreeTokenController);

// Payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
