import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// Create Category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(200).send({
      success: true,
      message: "Category Created successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating category",
      error,
    });
  }
};

// Update category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error updating category",
    });
  }
};

// Get All category
const allCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});

    res.status(200).send({
      success: true,
      message: "Category List",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error Getting category",
    });
  }
};

// Get Single category
const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug: req.params.slug});
    if(!category){
        return res.send({message: "No category"})
    }

    res.status(200).send({
      success: true,
      message: "Single Category",
      category
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error Getting single category",
    });
  }
};

// Delete category
const deleteCategoryController = async (req, res) => {
  try {
    const {id} = req.params;
    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Delete Category"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting category",
    });
  }
};

export {
  createCategoryController,
  updateCategoryController,
  allCategoryController,
  singleCategoryController,
  deleteCategoryController
};
