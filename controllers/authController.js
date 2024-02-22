import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

// User Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone, answer } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "Name must be Required" });
    }
    if (!email) {
      return res.send({ message: "Email must be Required" });
    }
    if (!password) {
      return res.send({ message: "Password must be Required" });
    }
    if (!address) {
      return res.send({ message: "Address must be Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone must be Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer must be Required" });
    }

    // Check User
    const existingUser = await userModel.findOne({ email });
    // Existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    // Register User
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();

    res
      .status(201)
      .send({ success: true, message: "User successfully registered", user });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while registering",
      error,
    });
  }
};

// User Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    }

    // Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email does not exist" });
    }

    // compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: `Welcome ${user.name}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Login",
      error,
    });
  }
};

// Forgot Password
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }

    // Check
    const user = await userModel.findOne({ email, answer });
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Password",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Forgoting Password",
      error,
    });
  }
};

const testController = (req, res) => {
  res.send("Test Controller");
};

// Update Profile
const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    // password
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and must be 6 characters",
      });
    }

    const hasedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hasedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error Updating Password",
      error,
    });
  }
};

// Order Controller
const orderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Order",
      error,
    });
  }
};

// Order Controller
const allOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({createdAt: -1})
    res.json(orders);

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Order",
      error,
    });
  }
};

// Order Status Controller
const updateStatusController = async (req, res) => {
  try {
    const {orderId} = req.params
    const {status} = req.body

    const orders = await orderModel.findByIdAndUpdate(orderId, {status},{new: true})
    res.json(orders);

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Update Order",
      error,
    });
  }
};

export {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  orderController,
  allOrderController,
  updateStatusController
};
