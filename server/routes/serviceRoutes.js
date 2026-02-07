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
  updateServiceStatus,
  updateUserProblemPrice,
  getGeoLocation
} = require("../controllers/serviceController");

router.get("/username/:name", async (req, res) => {
  try {
    const services = await ServiceOrder.find({ customerName: req.params.name });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Service fetch failed" });
  }
});

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
router.post("/geocode", getGeoLocation);
router.post("/book", bookService);
router.get("/admin-history", getAdminServiceHistory);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id/user-problem", updateUserProblemPrice)
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);
router.put("/:id/status", updateServiceStatus);

module.exports = router;
