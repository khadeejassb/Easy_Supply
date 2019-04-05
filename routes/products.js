const express = require("express");
const router  = express.Router({mergeParams: true});
const Store = require("../models/store");
const Product = require("../models/product");
const middleware = require("../middleware");
const { isLoggedIn, checkUserProduct, isAdmin } = middleware;

//Products New
router.get("/new", isLoggedIn, function(req, res){
    // find store by id
    console.log(req.params.id);
    Store.findById(req.params.id, function(err, store){
        if(err){
            console.log(err);
        } else {
             res.render("products/new", {store: store});
        }
    })
});

//products Create
router.post("/", isLoggedIn, function(req, res){
   //lookup store using ID
   Store.findById(req.params.id, function(err, store){
       if(err){
           console.log(err);
           res.redirect("/stores");
       } else {
        Product.create(req.body.product, function(err, product){
           if(err){
               console.log(err);
           } else {
               //add username and id to product
               product.author.id = req.user._id;
               product.author.username = req.user.username;
               //save product
               product.save();
               store.products.push(product);
               store.save();
               console.log(product);
               req.flash('success', 'Created a product!');
               res.redirect('/stores/' + store._id);
           }
        });
       }
   });
});
//show detailes
router.get("/:productId/show", function(req, res){
    //find the product with provided ID
    Product.findById(req.params.productId).exec(function(err, foundProduct){
        if(err || !foundProduct){
            console.log(err);
            req.flash('error', 'Sorry, that Product does not exist!');
            return res.redirect('/stores');
        }
        console.log(foundProduct)
        //render show template with that Product
        res.render("products/show", {product: foundProduct});
       
    });
});
// edit route
router.get("/:productId/edit", isLoggedIn, checkUserProduct, function(req, res){
  res.render("products/edit", {store_id: req.params.id, product: req.product});
});

router.put("/:productId", isAdmin, function(req, res){
   Product.findByIdAndUpdate(req.params.productId, req.body.product, function(err, product){
       if(err){
          console.log(err);
           res.render("edit");
       } else {
           res.redirect("/stores/" + req.params.id);
       }
   }); 
});
// delete route
router.delete("/:productId", isLoggedIn, checkUserProduct, function(req, res){
  // find store, remove Product from Products array, delete Product in db
  Store.findByIdAndUpdate(req.params.id, {
    $pull: {
      products: req.product.id
    }
  }, function(err) {
    if(err){ 
        console.log(err)
        req.flash('error', err.message);
        res.redirect('/');
    } else {
        req.product.remove(function(err) {
          if(err) {
            req.flash('error', err.message);
            return res.redirect('/');
          }
          req.flash('error', 'Product deleted!');
          res.redirect("/stores/" + req.params.id);
        });
    }
  });
});

module.exports = router;