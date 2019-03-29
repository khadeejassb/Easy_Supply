var mongoose = require("mongoose");

var categorySchema = mongoose.Schema({
   name: {type: String, unique: true }
   
});

module.exports = mongoose.model("Category", categorySchema);