const express = require("express");
const { PORT } = require("./config/constants");
const connectDB = require("./config/database");
const User = require("./models/users");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();

//express.json() converts the req json-object to Js-object
app.use(express.json());

//create user
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("Data saved successfully");
  } catch (err) {
    res.status(400).send("Error -> " + err.message);
  }
});
//login user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials email");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successfull!!!");
    } else {
      throw new Error("Invalid credentials password");
    }
  } catch (err) {
    res.status(400).send("Error ->" + err.message);
  }
});

//get user
app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const data = await User.findOne({ emailId: email });
    res.send(data);
  } catch (err) {
    res.status(400).send("Data failed to insert" + err.message);
  }
});

//update user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const items = req.body;

  try {
    const updateValidFields = [
      "password",
      "about",
      "skills",
      "photoUrl",
      "gender",
    ];
    const isUpdateAllowed = Object.keys(items).every((k) =>
      updateValidFields.includes(k)
    );
    if (items?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    await User.findByIdAndUpdate(userId, items, {
      runValidators: true,
    });
    res.send("updated successfully");
  } catch (err) {
    res.status(400).send("Data failed to insert - " + err.message);
  }
});

//delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete({ _id: userId });
    res.send("Deleted successfully");
  } catch (err) {
    res.status(400).send("Data failed to delete" + err.message);
  }
});
//get all users
app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (err) {
    res.status(400).send("Data failed to insert" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection established successfully...");
    app.listen(PORT, () => {
      console.log("Server is successfully running at port:", PORT);
    });
  })
  .catch((err) => {
    console.log("Database connection failed!!", err.message);
  });
