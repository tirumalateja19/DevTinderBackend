const express = require("express");
const { PORT } = require("./config/constants");
const connectDB = require("./config/database");

const app = express();

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
