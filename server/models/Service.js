const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    userProblem:{
      type: String,
    },
    userPrice:{
       type: Number,
       default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
