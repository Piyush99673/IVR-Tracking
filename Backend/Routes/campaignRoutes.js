const express = require("express");
const campaignController = require("../Controllers/campaignController");

const router = express.Router();

router.post("/", campaignController.createCampaign);
router.get("/:uid", campaignController.getCampaignStatus);

module.exports = router;
