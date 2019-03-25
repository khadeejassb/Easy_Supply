var mongoose = require("mongoose");

var storeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   cost: Number,
   location: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   products: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Product"
      }
   ],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
  
});

module.exports = mongoose.model("Store", storeSchema);