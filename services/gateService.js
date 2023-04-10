const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const Gate = require("../models/gateModel");

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getGates = factory.getAll(Gate);

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getGate = factory.getOne(Gate);

exports.setUserIdToBody = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
// @desc    Create Gate
// @route   POST  /api/v1/Gates
// @access  Private
exports.createGate = factory.createOne(Gate);
// @desc    Update specific Gate
// @route   PUT /api/v1/Gates/:id
// @access  Private
exports.updateGate = factory.updateOne(Gate);

// @desc    Delete specific Gate
// @route   DELETE /api/v1/Gates/:id
// @access  Private
exports.deleteGate = factory.deleteOne(Gate);
