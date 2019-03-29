var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Store = require("../models/store");
var Product = require("../models/product");
var Comment = require("../models/comment");
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

module.exports = router;