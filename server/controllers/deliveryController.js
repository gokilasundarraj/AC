const Order = require("../models/Order");

exports.getAllDeliveries = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status || order.status;
    await order.save();

    res.json({
      success: true,
      message: "Delivery status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
