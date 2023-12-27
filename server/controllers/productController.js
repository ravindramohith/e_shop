const Product = require("../models/Product");
const APIFactory = require("../utils/apiFactory");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

const ITEMS_PER_PAGE = 4;

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const apiFactory = new APIFactory(Product, req.query).search().filter();
  let products = await apiFactory.query;
  const count = products.length;

  const itemsPerPage = req.query.itemsPerPage || ITEMS_PER_PAGE;
  apiFactory.pagination(itemsPerPage);
  products = await apiFactory.query.clone();

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    count,
    itemsPerPage,
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews.user"
  );
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
