var mongoose = require("mongoose");

var conatctSchema = mongoose.Schema({
<<<<<<< HEAD
    name: String,
    icone : String,
=======
    icone : String,
    linke: String
>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a
});

module.exports = mongoose.model("Contact", conatctSchema);