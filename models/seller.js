var mongoose = require('mongoose');
var SellerSchema =new mongoose.Schema({
    name:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
    
});
module.exports = mongoose.model("Seller", SellerSchema);