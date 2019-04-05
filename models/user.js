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
    phone: {
        type: String,
        minlength: 7,
        maxlength: 20,
        required: true,
        validate: {
            validator: function (v) {
                return v.match(/[0-9\+\-\(\)\/]/g)
            },
            message: 'This is not a valid phone number'
        }
    },
    password:{type: String, required: true},
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