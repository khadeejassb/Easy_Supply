var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
<<<<<<< HEAD
  category: { 
         name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'}},
 /* category:{type: String, required: true},*/
=======
  category: {type: String, required: true},
>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a
  imagePath: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model('Product', ProductSchema);
