var mongoose = require("mongoose");
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
    password: String,
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
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);