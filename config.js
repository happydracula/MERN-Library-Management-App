var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1/myreactemp", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = db;
