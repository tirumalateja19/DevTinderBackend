const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send("connection request sent...");
  } catch (err) {
    res.status(400).send("Error ", +err.message);
  }
});

module.exports = requestRouter;
