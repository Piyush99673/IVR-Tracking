const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  callerId: {
    type: String,
    required: true,
  },
  from: {
    type: [String],
    required: true,
  },
  campaignType: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  schedule: {
    sendAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerResponse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerResponse",
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
