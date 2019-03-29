var mongoose = require("mongoose");
//var enumValues = require('mongoose-enumvalues');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
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
  /*   role: {
    type: String,
    enum: ['admin', 'seller', 'customer'],
    default: 'customer'
  },*/
    phone: {
        type: String,
        minlength: 10,
        maxlength: 12,
        required: true,
        validate: {
            validator: function (v) {
                return v.match(/[0-9\+\-\(\)\/]/g)
            },
            message: 'This is not a valid phone number'
        }
    },
    password: String,
  stores: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Store"
      }
      ],

    isAdmin: {type: Boolean, default: false}
});
const enumOptions = {};
UserSchema.plugin(passportLocalMongoose);
//UserSchema.plugin(enumValues, enumOptions);

module.exports = mongoose.model("User", UserSchema);