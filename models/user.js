var mongoose = require("mongoose");
//var enumValues = require('mongoose-enumvalues');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
<<<<<<< HEAD
   username: String,
=======
    username: String,
>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a
    email: {
        type: String,
        minlength: 5,
        validate: {
            validator: function (v) {
                return v.match(/\S+@\S+\.\S+/g)
            },
            message: 'This is not a valid e-mail address'
        },
        required: true,
    },
<<<<<<< HEAD
  /*   role: {
    type: String,
    enum: ['admin', 'seller', 'customer'],
    default: 'customer'
  },*/
    phone: {
        type: String,
        minlength: 10,
        maxlength: 12,
=======
    phone: {
        type: String,
        minlength: 7,
        maxlength: 20,
>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a
        required: true,
        validate: {
            validator: function (v) {
                return v.match(/[0-9\+\-\(\)\/]/g)
            },
            message: 'This is not a valid phone number'
        }
    },
    password: String,
<<<<<<< HEAD
  stores: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Store"
      }
      ],

    isAdmin: {type: Boolean, default: false}
=======
     type: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller"
        },
         id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
       },
    isAdmin: {type: Boolean, default: false},
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a
});
const enumOptions = {};
UserSchema.plugin(passportLocalMongoose);
//UserSchema.plugin(enumValues, enumOptions);

module.exports = mongoose.model("User", UserSchema);