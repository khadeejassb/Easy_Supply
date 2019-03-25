var mongoose = require("mongoose");

var adsSchema = mongoose.Schema({
    title: String,
    image : String,
});

module.exports = mongoose.model("Ads", adsSchema);