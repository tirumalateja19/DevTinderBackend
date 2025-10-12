const express = require("express");
const app = express();
const port = 5656;

app.get(
  "/student",
  [
    (req, res, next) => {
      console.log("Route Handler1");
      // res.send("Response1");
      next();
    },
    (req, res, next) => {
      console.log("Route Handler2");
      // res.send("Response2");
      next();
      //even though it is in an array output does'nt change
    },
  ],
  (req, res, next) => {
    console.log("Route Handler3");
    // res.send("Response3");
    next(); //Keeps on waiting if there was no 4th route handler
  },
  (req, res, next) => {
    console.log("Route Handler4");
    // res.send("Response4");
    // next(); cannot get /student/ - if above line is commented
  }
);

app.listen(port, () => {
  console.log("Server successfully running at port:", port);
});
