const express = require("express");
const {
  getGateValidator,
  updateGateValidator,
  creatGateValidator,
  deleteGateValidator,
} = require("../utills/validators/gateValidator");

const {
  getGates,
  getGate,
  createGate,
  updateGate,
  deleteGate,
  // setUserIdToBody,
} = require("../services/gateService");
const router = express.Router();
router
  .route("/")
  .get(getGates)
  .post(/*setUserIdToBody,*/ creatGateValidator, createGate);
router
  .route("/:id")
  .get(getGateValidator, getGate)
  .put(updateGateValidator, updateGate)
  .delete(deleteGateValidator, deleteGate);
module.exports = router;
