const Service = require("../models/Service");
const fs = require("fs");
const path = require("path");
const ServiceOrder = require("../models/ServiceOrder"); // ✅ import once at top

exports.createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !price) {
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
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.name = req.body.name || service.name;
    service.description = req.body.description || service.description;
    service.price = req.body.price || service.price;

    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", "uploads", service.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      service.image = req.file.filename;
    }

    await service.save();
    res.json({ success: true, message: "Service updated successfully", service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (service.image) {
      const imagePath = path.join(__dirname, "..", "uploads", service.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
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

    if (!customerName || !customerPhone || !services || !totalPrice || !address) {
      return res.status(400).json({ message: "All fields are required to book a service" });
    }

    const serviceOrder = await ServiceOrder.create({
      user,
      customerName,
      customerPhone,
      customerEmail,
      services,
      totalPrice,
      address,
      status: "PENDING",
    });

    res.status(201).json({ success: true, message: "Service booked successfully", order: serviceOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateServiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await ServiceOrder.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Service order not found" });

    order.status = status.toUpperCase();

    if (order.status === "COMPLETED") {
      order.completedAt = new Date();
    }

    await order.save();
    res.json({ success: true, message: `Service status updated to ${order.status}`, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
