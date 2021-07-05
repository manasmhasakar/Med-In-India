const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});

app.use(express.static(path.join(__dirname, "/client-app/build")));
app.use(express.static("/client-app/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/client-app/public", "index.html"));
  // res.sendFile(path.join(__dirname, "client-app/build", "index.html"));
});

app.listen(process.env.PORT || 8080);
