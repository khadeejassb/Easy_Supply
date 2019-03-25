var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Store = require("../models/store");
var Product = require("../models/product");
var Comment = require("../models/comment");
var Contact = require("../models/contact");
var Cart = require('../models/cart');
var middleware = require("../middleware");
var { isLoggedIn, checkUserStore, checkUserProduct,checkUserComment, isAdmin,MyCart } = middleware; // destructuring assignment

//Cart rout
router.get('/',isLoggedIn, MyCart, function(req, res, next){
    Cart.findOne({ owner: req.user._id }).populate('items.item').exec(function(err, foundCart) {
        console.log("found cart is", foundCart);
        if (err) return next(err);
        res.render('cart', {foundCart: foundCart});
    });
});
router.post('/:id',isLoggedIn, MyCart, function(req, res, next){
  Cart.findOne({ owner: req.user._id}, function(err, cart){
    cart.items.push({
      item: req.body["product._id"], //look for product_id
      price: parseFloat(req.body.priceValue),
      quantity: parseInt(req.body.quantity)
    });

    cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);
      
      cart.save(function(err){
        if (err) 
        {return next(err);
            
        }else { 
             console.log(cart);
        }
        return res.redirect('cart');
    });
  });
});

router.post('/remove',isLoggedIn, MyCart, function(req, res, next) {
  Cart.findOne({ owner: req.user._id }, function(err, foundCart) {
    foundCart.items.pull(String(req.body.item));
    foundCart.total = (foundCart.total - parseFloat(req.body.price)).toFixed(2);
    foundCart.save(function(err, found) {
      if (err) return next(err);
      req.flash('remove', 'Successfully removed');
      res.redirect('cart');
    });
  });
});

module.exports = router;