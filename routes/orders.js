var express = require("express");
var router  = express.Router();
var Order = require("../models/order");
var middleware = require("../middleware");
var { isLoggedIn} = middleware; // destructuring assignment
router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    let cart = req.session.cart;
    let errMsg = req.flash('error')[0];
    res.render('checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    var cart = req.session.cart;
    var username = {
      id: req.user._id,
      username: req.user.username
  };
    var address = req.body.address;
    var postlcode = req.body.postlcode;
    var phonenumber = req.body.phonenumber;
    var name = req.body.name;
    var order = {username: username, cart: cart, address:address, postlcode:postlcode, phonenumber:phonenumber, name:name};
    
    Order.create(order,function(err, result) {
            if(err){
                console.log(err);
              res.redirect('/checkout');  
            } else {
            console.log(result);
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/stores');
            }
        });
});
router.get("/order", function(req, res, next){
    //find the order with provided ID
    Order.findOne( req.params._id ,function (err, foundOrder){
         if (err){
             console.log(err);
             return next(err);
         };

      res.render("order", { order: foundOrder });
    });
 
});

module.exports = router;