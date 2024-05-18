const express = require("express");
const customerResponseController = require("../Controllers/customerResponseController");

const router = express.Router();

router.post("/", customerResponseController.handleCustomerResponse);

module.exports = router;
