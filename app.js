const express = require("express");
const mongoose = require("./Backend/Config/database");
const campaignRoutes = require("./Backend/Routes/campaignRoutes");
const customerResponseRoutes = require("./Backend/Routes/customerResponseRoutes");

const app = express();

app.use(express.json());

app.use("/campaigns", campaignRoutes);
app.use("/customer-responses", customerResponseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
