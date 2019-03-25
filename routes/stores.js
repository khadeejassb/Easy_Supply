var express = require("express");
var router  = express.Router();
var Store = require("../models/store");
var Product = require("../models/product");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var { isLoggedIn, checkUserStore, checkUserProduct,checkUserComment, isAdmin } = middleware; // destructuring assignment

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//INDEX - show all Stores
router.get("/", function(req, res){
  if(req.query.search && req.xhr) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all Stores from DB
      Store.find({name: regex}, function(err, allStores){
         if(err){
            console.log(err);
         } else {
            res.status(200).json(allStores);
         }
      });
  } else {
      // Get all Stores from DB
      Store.find({}, function(err, allStores){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allStores);
            } else {
              res.render("stores/index",{stores: allStores, page: 'stores'});
            }
         }
      });
  }
});

//CREATE - add new store to DB
router.post("/", isLoggedIn, function(req, res){
  // get data from form and add to stores array
  // get data from form and add to Stores array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var cost = req.body.cost;
  var location = req.body.location;
     var newStore = {name: name, image: image, description: desc, cost: cost, author:author, location: location};
    // Create a new Store and save to DB
    Store.create(newStore, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to stores page
            console.log(newlyCreated);
            res.redirect("/stores");
        }
    });
  });


//NEW - show form to create new store
router.get("/new", isLoggedIn, function(req, res){
   res.render("stores/new"); 
});
 
// SHOW - shows more info about one store
router.get("/:id", function(req, res){
    //find the store with provided ID
    Store.findById(req.params.id).populate("products").populate("comments").exec(function(err, foundStore){
        if(err || !foundStore){
            console.log(err);
            req.flash('error', 'Sorry, that store does not exist!');
            return res.redirect('/stores');
        }
        console.log(foundStore)
        //render show template with that store
        res.render("stores/show", {store: foundStore});
       
    });
});

// EDIT - shows edit form for a store
router.get("/:id/edit", isLoggedIn, checkUserStore, function(req, res){
  //render edit template with that store
  res.render("stores/edit", {store: req.store});
});

// PUT - updates store in the database
router.put("/:id", function(req, res){
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: req.body.location};
    Store.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, store){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/stores/" + store._id);
        }
    });
  
});

// DELETE - removes store and its products from the database
router.delete("/:id", isLoggedIn, checkUserStore, function(req, res) {
    Product.remove({
      _id: {
        $in: req.store.products
      }
    },
   function(err) {
      if(err) {
          req.flash('error', err.message);
          res.redirect('/');
      } else {
          req.store.remove(function(err) {
            if(err) {
                req.flash('error', err.message);
                return res.redirect('/');
            }
            req.flash('error', 'Store deleted!');
            res.redirect('/stores');
          });
      }
    })
});

module.exports = router;

