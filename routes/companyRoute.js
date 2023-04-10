const express = require("express");
const multer = require("multer");

const { 
  getCompayValidator,
  updateCompanyValidator,
  creatCompanyValidator,
  deleteCompanyValidator,
} = require("../utills/validators/companyValidator");

const {
  getCompanies,
  getCompany,
  creatCompany,
  updateCompany,
  deleteCompany,
  uploadlogoImage,
  resizeImage,
  setUserIdToBody,
} = require("../services/companyService");
const userRoute = require("./userRoute");
// const orderRoute = require("./orderRoute");


const router = express.Router({ mergeParams: true });

router.use("/:companiesId/users/", userRoute);
// router.use("/:companyId/orders/", orderRoute);

router
  .route("/")
  .get(getCompanies)
  .post(
    setUserIdToBody,
    uploadlogoImage,
    resizeImage,
    creatCompanyValidator,
    creatCompany
  );
router
  .route("/:id")
  .get(
    // getCompayValidator ,
    getCompany,)
  .put(
    // updateCompanyValidator,
    uploadlogoImage,
    resizeImage,
     updateCompany,)
  .delete(
    // deleteCompanyValidator,
     deleteCompany,
     );
module.exports = router;
 