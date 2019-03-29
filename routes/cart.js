var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Store = require("../models/store");
var Product = require("../models/product");
var Comment = require("../models/comment");
<<<<<<< HEAD
var Cart = require('../models/cart');
var middleware = require("../middleware");
var { isLoggedIn, checkUserStore, checkUserProduct,checkUserComment, isAdmin ,cartLength } = middleware; // destructuring assignment

//Cart rout
router.get('/cart', function(req, res){
		// Get cart from session
		var cart = req.session.cart;
		var displayCart = {items: [], total:0};
		var total = 0;

		// Get Total
		for(var item in cart){
			displayCart.items.push(cart[item]);
			total += (cart[item].qty * cart[item].price);
		}
		displayCart.total = total;

		// Render Cart
		res.render('cart', {cart: displayCart });
	});

	router.post('/', function(req, res){
		var cart = req.params.cart;

		Product.findOne({_id:req.params.id}, function(err, product){
			if(err){
				console.log(err);
			}

			if(cart[req.params.id]){
				cart[req.params.id].qty++
			} else {
				cart[req.params.id] = {
					item: product._id,
					title: product.title,
					price: product.price,
					qty: 1
				}
			}

			res.redirect('cart');
		});
	});
=======
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
>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a

module.exports = router;