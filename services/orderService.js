const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
factory = require("./handlersFactory");
const Order = require("../models/ordertModel");

const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
exports.uploadOrderImages = uploadMixOfImages([
  {
    name: 'file',
    maxCount: 1,
  },
  {
    name: 'files',
    maxCount: 5,
  },
]);

exports.resizeOrderImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.file) {
    const imagessFileName = `order-${uuidv4()}-${Date.now()}-imagess.jpeg`;

    await sharp(req.files.file[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/orders/${imagessFileName}`);

    // Save image into our db
    req.body.file = imagessFileName;
  }
  //2- Image processing for images
  if (req.files.files) {
    req.body.files = [];
    await Promise.all(
      req.files.files.map(async (img, index) => {
        const imageName = `order-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/orders/${imageName}`);

        // Save image into our db
        req.body.files.push(imageName);
      })
    );

    next();
  }
});
// const transportModel = require("../models/transportModel");



// @desc    Get list of reviews
// @route   GET /api/v1/reviews
// @access  Public 
exports.getOrders = factory.getAll(Order);

// @desc    Get specific review by id 
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getOrder = factory.getOne(Order);

// Nested route (Create)
exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.Order) req.body.Order = req.params.OrderId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
// @desc    Create Order
// @route   POST  /api/v1/Orders
// @access  Private/Protect/User
exports.createOrder = factory.createOne(Order);

// @desc    Update specific Order
// @route   PUT /api/v1/Order/:id
// @access  Private/Protect/User
exports.updateOrder = factory.updateOne(Order);

// @desc    Delete specific Order
// @route   DELETE /api/v1/Order/:id
// @access  Private/Protect/User-Admin-Manager
exports.deleteOrder = factory.deleteOne(Order);




