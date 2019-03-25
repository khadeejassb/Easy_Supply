var mongoose = require("mongoose");

var conatctSchema = mongoose.Schema({
    icone : String,
    linke: String
});

module.exports = mongoose.model("Contact", conatctSchema);