const mongoose = require("mongoose");

const customerResponseSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  customerStatus: {
    type: String,
    required: true,
    enum: ["attempted", "busy", "cancelled"],
  },
  customerResponseTimeStamp: {
    type: Date,
    required: true,
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
});

const CustomerResponse = mongoose.model(
  "CustomerResponse",
  customerResponseSchema
);

module.exports = CustomerResponse;
