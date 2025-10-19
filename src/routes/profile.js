const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateProfileEditData } = require("../utils/validation");
const { validateNewPassword } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/users");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error ->" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateProfileEditData(req);
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

profileRouter.patch("/profile/passwordUpdate", userAuth, async (req, res) => {
  try {
    validateNewPassword(req);
    const loggedInUser = req.user;
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(loggedInUser._id, { password: passwordHash });
    res.send("Update Successfull");
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});
module.exports = profileRouter;
