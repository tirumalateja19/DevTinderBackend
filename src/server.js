const express = require("express");
const app = express();
const port = 5656;

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.get("/test", (req, res) => {
  //fetching data
  res.send("Data fetched successfully");
});
app.post("/test", (req, res) => {
  //logic for saving data
  res.send("Data saved successfully");
});
app.delete("/test", (req, res) => {
  //logic for deleting data
  res.send("Data Deleted successfully");
});
app.listen(port, () => {
  console.log("Server successfully running at port:", port);
});
