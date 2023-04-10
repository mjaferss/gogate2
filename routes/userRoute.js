const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utills/validators/userValidator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
  createFilterObj,
  setComponyIdToBody,
} = require("../services/userService");

const authService = require("../services/authService");
const router = express.Router({ mergeParams: true });
//router.use(authService.protect);
const orderRoute = require("./orderRoute");
const reviewRoute = require("./reviewRoute");
const gateRoute = require("./gateRoute");
// const companyRoute = require("./companyRoute");

router.use("/:userId/reviews/", reviewRoute);
router.use("/:userId/orders/", orderRoute);
router.use("/:userId/gates/", gateRoute);
// router.use("/:userId/companies/", companyRoute);
 
router.get("/getMe", getLoggedUserData, getUser);
router.put("/changeMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

// Admin
//router.use(authService.allowedTo("admin", "manager"));

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);
router
  .route("/")
  .get(createFilterObj, getUsers)
  .post(
    setComponyIdToBody,
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser
  );
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
