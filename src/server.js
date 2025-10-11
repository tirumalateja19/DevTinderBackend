const express = require("express");
const app = express();
const port = 5656;

app.get("/", (req, res) => {
  res.send(" Nodejs 🚀🚀!!");
});
app.get("/test", (req, res) => {
  res.send("Nodejs Backend of DevZone");
});
app.listen(port, () => {
  console.log("Server successfully running at port:", port);
});
