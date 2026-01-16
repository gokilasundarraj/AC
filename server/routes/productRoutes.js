const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const Order = require("../models/Order"); 

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/create", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

router.get("/user/:name", async (req, res) => {
  const orders = await Order.find({
    userName: req.params.name
  });
  res.json(orders);
});


module.exports = router;
