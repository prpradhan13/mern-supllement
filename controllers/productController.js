import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import braintree from 'braintree'
import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv'

dotenv.config();

// Payment Getway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHAND_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Create Product
const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      isFeatured,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and must be lesser than 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error Creating Product",
    });
  }
};

// Update Product
const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      isFeatured,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and must be lesser than 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error Updated Product",
    });
  }
};

// Get Product
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      total: products.length,
      message: "All Product",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Creating Product",
    });
  }
};

// Get Single Product
const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Creating Product",
    });
  }
};

// Get Product Photo
const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Creating Product",
    });
  }
};

// Delete Product
const deleteproductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res
      .status(200)
      .send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Creating Product",
    });
  }
};

// Filter Product
const filterProductController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Product not found",
    });
  }
};

// Product Count
const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Product not Counted",
    });
  }
};

// Product Count
const productListController = async (req, res) => {
  try {
    const perPage = 9;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error Product List",
    });
  }
};

// Search Product
const searchProductController = async (req, res) => {
  try {
    const {keyword} = req.params
    const results = await productModel.find({
      $or:[
        {name: {$regex: keyword, $options: "i"}},
        {description: {$regex: keyword, $options: "i"}}
      ]
    }).select("-photo")

    res.json(results);
    
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error Search Product",
      error,
    });
  }
};

// Search Product
const relatedProductController = async (req, res) => {
  try {
    const {pid, cid} = req.params
    const products = await productModel.find({
      category: cid,
      _id: {$ne: pid}
    }).select("-photo").limit(3).populate("category")
    res.status(200).send({
      success: true,
      products,
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error Related Product",
      error,
    });
  }
};

// Category wise Products
const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug: req.params.slug})
    const products = await productModel.find({category}).populate('category')
    res.status(200).send({
      success: true,
      category,
      products,
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error Category wise Products",
      error,
    });
  }
};

// Payment gateway api
// Token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function(err, response){
      if (err) {
        res.status(500).send(err);
      }else{
        res.send(response);
      }
    })
  } catch (error) {
  }
};

// Payment
const braintreePaymentController = async (req, res) => {
  try {
    const {cart, nonce} = req.body
    let total = 0
    cart.map((i) => (total += i.price))
    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options:{
        submitForSettlement: true,
      }
    },
    function(error, result){
      if (result) {
        const order = new orderModel({
          products: cart,
          payment: result,
          buyer: req.user._id
        }).save()
        res.json({ok: true})
      } else {
        res.status(500).send(error)
      }
    }
    )
  } catch (error) {
  }
};

export {
  createProductController,
  updateProductController,
  getProductController,
  singleProductController,
  productPhotoController,
  deleteproductController,
  filterProductController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
};
