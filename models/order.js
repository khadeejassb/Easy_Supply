const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    username: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    postlcode: {type: Number, required: true},
    phonenumber: {type: String, required: true},
    name: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);
