const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getAllOrders);


router.get("/username/:name", async (req, res) => {
  try {
    const orders = await Order.find({ userName: req.params.name });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Order fetch failed" });
  }
});

router.get("/userid/:id", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Order fetch failed" });
  }
});



router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
