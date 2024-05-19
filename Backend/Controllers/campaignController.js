const Campaign = require("../Models/campaign");
const CustomerResponse = require("../Models/customerResponse");

exports.createCampaign = async (req, res) => {
  try {
    const { campaigns, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const createdCampaigns = await Promise.all(
      campaigns.map(async (campaign) => {
        const newCampaign = new Campaign({
          name: campaign.name,
          callerId: campaign.caller_id,
          from: campaign.from,
          campaignType: campaign.campaign_type,
          uid: campaign.uid,
          schedule: {
            sendAt: new Date(campaign.schedule.send_at),
            endAt: new Date(campaign.schedule.end_at),
          },
          user: userId,
        });
        return await newCampaign.save();
      })
    );
    res.status(201).json(createdCampaigns);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCampaignStatus = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ uid: req.params.uid }).populate({
      path: "customerResponse",
      strictPopulate: false,
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.status(200).json({
      uid: campaign.uid,
      customerStatus: campaign.customerResponse?.customerStatus,
      customerResponseTimeStamp:
        campaign.customerResponse?.customerResponseTimeStamp,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
