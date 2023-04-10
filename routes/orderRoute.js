
const express = require("express");

const {
  creatOrderValidator,
  updateOrderValidator,
  getOrderValidator,
  deleteOrderValidator,
} = require("../utills/validators/orderValidator");
 
const {
  getOrder,
  getOrders,
  createOrder,
  updateOrder, 
  deleteOrder,
  uploadOrderImages,
  resizeOrderImages,
  //   createFilterObj,
  //   setProductIdAndUserIdToBody,
} = require("../services/orderService");

const authService = require("../services/authService");

const router = express.Router({ mergeParams: true });



const reviewRoute = require("./reviewRoute");

router.use("/:orderId/reviews/", reviewRoute);

router.route("/").get(/*createFilterObj,*/ getOrders).post(
  /*authService.protect,
    authService.allowedTo('user'),
    setProductIdAndUserIdToBody,*/
//   creatProfileValidator,
uploadOrderImages,
resizeOrderImages,
  createOrder
); 
router
  .route("/:id")
  .get(
    // getProfileValidator,
     getOrder)
  .put(
    /*authService.protect,
    authService.allowedTo('user'),*/
    // updateProfileValidator,
    uploadOrderImages,
    resizeOrderImages,
    updateOrder
  )
  .delete(
    /*authService.protect,
    authService.allowedTo('user', 'manager', 'admin'),*/
    // deleteProfileValidator,
    
    deleteOrder
  );

module.exports = router;


