const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const ServiceOrder = require("../models/ServiceOrder");

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getAdminServiceHistory,
  bookService,
  updateServiceStatus
} = require("../controllers/serviceController");

// ✅ USER SERVICE ORDERS BY NAME
router.get("/username/:name", async (req, res) => {
  try {
    const services = await ServiceOrder.find({ customerName: req.params.name });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Service fetch failed" });
  }
});

// ✅ USER SERVICE ORDERS BY USER ID
router.get("/userid/:id", async (req, res) => {
  try {
    const services = await ServiceOrder.find({ user: req.params.id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Service fetch failed" });
  }
});

router.get("/completed", async (req, res) => {
  try {
    const services = await ServiceOrder.find({ status: "COMPLETED" })
      .sort({ completedAt: -1 });

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Completed services fetch failed" });
  }
});

router.post("/create", upload.single("image"), createService);
router.post("/book", bookService);
router.get("/admin-history", getAdminServiceHistory);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);
router.put("/:id/status", updateServiceStatus);

module.exports = router;
