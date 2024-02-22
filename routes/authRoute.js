import express from "express";
import {
  allOrderController,
  forgotPasswordController,
  loginController,
  orderController,
  registerController,
  testController,
  updateProfileController,
  updateStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

// Router object
const router = express.Router();

// Routing
// Register || Method POST
router.post("/register", registerController);

// Login || Method POST
router.post("/login", loginController);

// Forgot Password || Method POST
router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn, isAdmin, testController);

// Protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update Profile
router.put("/userprofile", requireSignIn, updateProfileController);

// Oreders
router.get("/orders", requireSignIn, orderController);

// All Oreders
router.get("/all-orders", requireSignIn, isAdmin, allOrderController);

// Status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, updateStatusController);

export default router;
