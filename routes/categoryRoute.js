import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  allCategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// Routes
// Create Category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Get All Category
router.get("/allcategory", allCategoryController);

// Get Single Category
router.get("/singlecategory/:slug", singleCategoryController);

// Get Single Category
router.delete(
  "/deletecategory/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
