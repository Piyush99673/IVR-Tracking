// const Campaign = require("../Models/campaign");
const CustomerResponse = require("../Models/customerResponse");

exports.handleCustomerResponse = async (req, res) => {
  try {
    const { uid, customerStatus, customerResponseTimeStamp } = req.body;
    const campaign = await Campaign.findOne({ uid });
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    const customerResponse = new CustomerResponse({
      uid,
      customerStatus,
      customerResponseTimeStamp: new Date(customerResponseTimeStamp),
      campaign: campaign._id,
    });
    await customerResponse.save();
    campaign.customerResponse = customerResponse._id;
    await campaign.save();
    res.status(201).json(customerResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
