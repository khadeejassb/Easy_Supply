var mongoose = require('mongoose');
var CustomerSchema =new mongoose.Schema({
    name:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
    
});
module.exports = mongoose.model("Customer", CustomerSchema);