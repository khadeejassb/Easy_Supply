var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  category: { 
         name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'}},
 /* category:{type: String, required: true},*/
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
