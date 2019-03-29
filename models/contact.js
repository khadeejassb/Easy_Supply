var mongoose = require("mongoose");

var conatctSchema = mongoose.Schema({
    name: String,
    icone : String,
});

module.exports = mongoose.model("Contact", conatctSchema);