const Service = require("../models/Service");
const fs = require("fs").promises;
const https = require("https");
const path = require("path");
const ServiceOrder = require("../models/ServiceOrder");

// Helper to safely delete file
const safeDeleteFile = async (filename) => {
  if (!filename) return;
  try {
    const filePath = path.join(__dirname, "..", "uploads", filename);
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') console.error("Error deleting file:", err);
  }
};

exports.createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !price) {
      if (req.file) await safeDeleteFile(req.file.filename);
      return res.status(400).json({ message: "Service name and price are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Service image is required" });
    }

    const service = await Service.create({
      name,
      description,
      price,
      image: req.file.filename,
    });

    res.status(201).json({ success: true, message: "Service created successfully", service });
  } catch (error) {
    if (req.file) await safeDeleteFile(req.file.filename);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      if (req.file) await safeDeleteFile(req.file.filename);
      return res.status(404).json({ message: "Service not found" });
    }

    service.name = req.body.name || service.name;
    service.description = req.body.description || service.description;
    service.price = req.body.price || service.price;

    if (req.file) {
      if (service.image) await safeDeleteFile(service.image);
      service.image = req.file.filename;
    }

    await service.save();
    res.json({ success: true, message: "Service updated successfully", service });
  } catch (error) {
    if (req.file) await safeDeleteFile(req.file.filename);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (service.image) {
      await safeDeleteFile(service.image);
    }

    await service.deleteOne();
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminServiceHistory = async (req, res) => {
  try {
    const history = await ServiceOrder.find()
      .populate("technician", "name email")
      .populate("user", "name email phone")
      .populate("services.service", "name")
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookService = async (req, res) => {
  try {
    const { user, customerName, customerPhone, customerEmail, services, totalPrice, address } = req.body;

    // Use null checks to ensure 0 or empty string are properly handled if allowing specific values,
    // but here we want to ensure they exist.
    if (!customerName || !services || services.length === 0 || !address) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const serviceOrder = await ServiceOrder.create({
      user,
      customerName,
      customerPhone,
      customerEmail,
      services,
      totalPrice,
      address,
      status: "PENDING",
      otp, // Save generated OTP
    });

    res.status(201).json({ success: true, message: "Service booked successfully", order: serviceOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateServiceStatus = async (req, res) => {
  try {
    const { status, verificationOtp } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const order = await ServiceOrder.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Service order not found" });

    if (status.toUpperCase() === "COMPLETED") {
      if (order.otp && order.otp !== verificationOtp) {
        return res.status(400).json({ message: "Invalid OTP. Verification failed." });
      }
      order.completedAt = new Date();
    }

    order.status = status.toUpperCase();

    await order.save();
    res.json({ success: true, message: `Service status updated to ${order.status}`, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateUserProblemPrice = async (req, res) => {

  try {
    const { problem, price } = req.body;

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.userProblem = problem;
    service.userPrice = price;

    await service.save();

    res.status(200).json({
      success: true,
      message: "User problem & price updated",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGeoLocation = (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Coordinates required" });
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  const options = {
    headers: {
      'User-Agent': 'CoolingMastersApp/1.0 (contact@coolingmasters.com)'
    }
  };

  const reqNominatim = https.get(url, options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (e) {

        console.error("JSON Parse Error:", e);
        res.status(500).json({ message: "Error parsing location data" });
      }
    });

  });

  reqNominatim.on("error", (err) => {
    console.error("Nominatim API Error:", err);
    res.status(500).json({ message: "Failed to fetch address from external service" });
  });

  reqNominatim.end();
};
