const express = require("express");
const router = express.Router();

const {
  getAllDeliveries,
  updateDeliveryStatus,
} = require("../controllers/deliveryController");

router.get("/", getAllDeliveries);
router.put("/:id", updateDeliveryStatus);

module.exports = router;
