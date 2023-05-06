var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var db = require("./config");
var ejs = require("ejs");
const { Int32 } = require("mongodb");
var cors = require("cors");
var app = express();
app.set("view engine", "ejs");
var port = process.env.port || 5000;
var srcpath = path.join(__dirname, "/public");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Database Connectivity
var Schema = mongoose.Schema;
var BookSchema = new Schema(
  {
    title: { type: String, unique: true, dropDups: true },
    author: { type: String },
    publisher: { type: String },
    rating: { type: String },
  },
  { versionKey: false }
);
var model = mongoose.model("Books", BookSchema, "Books");
app.get("/display", function (req, res) {
  console.log("Displying");
  model
    .find()
    .sort({ title: 1 })
    .exec()
    .then(function (i) {
      res.json({ array: i });
    });
});
//api for INSERT data from database
app.post("/insert", function (req, res) {
  console.log("Request made");
  console.log(req.body);
  var mod = new model(req.body);
  req.body.serverMessage = "NodeJS replying to REACT";
  mod.save().then(function (result) {
    console.log("Employee Inserted");
    /*Sending the respone back to the angular Client */
    res.json({
      status: "success",
    });
  });
});

app.post("/delete", function (req, res) {
  var title = req.body.title;

  model.deleteMany({ title: title }).then(function (obj) {
    if (obj.deletedCount >= 1) {
      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "Fail",
      });
    }
  });
});

//Update data from database
app.get("/update.html", function (req, res) {
  res.sendFile(__dirname + "/" + "update.html");
});

app.post("/update", function (req, res) {
  var title = req.body.title;
  var author = req.body.author;
  var publisher = req.body.publisher;
  var rating = req.body.rating;
  model
    .findOneAndUpdate(
      { title: title },
      { author: author, publisher: publisher, rating: rating },
      { multi: true }
    )
    .then(function (obj) {
      console.log("Updated");
      res.json({
        status: "success",
      });
    });
});

//--------------SEARCH------------------------------------------
app.get("/search.html", function (req, res) {
  res.sendFile(__dirname + "/" + "search.html");
});

app.get("/search", function (req, res) {
  //var empidnum=parseInt(req.query.empid)  // if empid is an integer
  var empidnum = req.query.empid;
  model
    .find({ empid: empidnum }, { empname: 1, empid: 1, _id: 0 })
    .exec()
    .then(function (docs) {
      if (docs == "") {
        res.send("<br/>" + empidnum + ":" + "<b>Emplyee Not Found</b>");
      } else {
        res.status(200).json(docs);
      }
    });
});

//server stat on given port
app.listen(port, function () {
  console.log("server start on port:" + port);
});
