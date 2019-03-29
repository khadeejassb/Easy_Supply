var Product = require('../models/product');
var Store = require('../models/store');
var Comment = require('../models/comment');
<<<<<<< HEAD
var Cart = require('../models/cart');
=======
var User = require('../models/user');
var Cart = require('../models/cart');

>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a
module.exports = {
  isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash('error', 'You must be signed in to do that!');
      res.redirect('/login');
  },
  checkUserStore: function(req, res, next){
    Store.findById(req.params.id, function(err, foundStore){
      if(err || !foundStore){
          console.log(err);
          req.flash('error', 'Sorry, that store does not exist!');
          res.redirect('/stores');
      } else if(foundStore.author.id.equals(req.user._id) || req.user.isAdmin){
          req.store = foundStore;
          next();
      } else {
          req.flash('error', 'You don\'t have permission to do that!');
          res.redirect('/stores/' + req.params.id);
      }
    });
  },
  checkUserProduct: function(req, res, next){
    Product.findById(req.params.productId, function(err, foundProduct){
       if(err || !foundProduct){
           console.log(err);
           req.flash('error', 'Sorry, that product does not exist!');
           res.redirect('/stores');
       } else if(foundProduct.author.id.equals(req.user._id) || req.user.isAdmin){
            req.product = foundProduct;
            next();
       } else {
           req.flash('error', 'You don\'t have permission to do that!');
           res.redirect('/stores/' + req.params.id);
       }
    });
  },
    checkUserComment: function(req, res, next){
    Comment.findById(req.params.commentId, function(err, foundComment){
       if(err || !foundComment){
           console.log(err);
           req.flash('error', 'Sorry, that comment does not exist!');
           res.redirect('/stores');
       } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
            req.comment = foundComment;
            next();
       } else {
           req.flash('error', 'You don\'t have permission to do that!');
           res.redirect('/stores/' + req.params.id);
       }
    });
  },
  isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'This site is now read only thanks to spam and trolls.');
      res.redirect('back');
    }
  },
<<<<<<< HEAD
 cartLength: function(req, res, next) {
   if (req.user){
=======
isSeller: function(req, res, next) {
    if(req.user.seller) {
      next();
    } else {
      req.flash('error');
      res.redirect('back');
    }
},
isCustumer: function(req, res, next) {
    if(req.user.customer) {
      next();
    } else {
      req.flash('error');
      res.redirect('back');
    }
},


MyCart: function (req, res, next){

  if (req.user){
>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a
   var total = 0;
   Cart.findOne({ owner: req.user._id }, function(err, cart){
    if(cart){
      for (var i = 0; i < cart.items.length; i++) {
        total += cart.items[i].quantity;
      }
      // locals refers to local variable
      res.locals.cart = total;
    } else {
      res.locals.cart = 0;
    }
    next(); 
    });  
  } else {
    next();
<<<<<<< HEAD
    }
   
 }
  };
  
=======
   }
}
}
>>>>>>> 2a19f6cec8c565c587a28f9a347a40838d87a61a
