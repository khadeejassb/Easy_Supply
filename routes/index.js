var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Store = require("../models/store");
var middleware = require("../middleware");
var { isLoggedIn, checkUserStore, checkUserProduct,checkUserComment, isAdmin } = middleware; // destructuring assignment


//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, email:req.body.email, phone:req.body.phone});
    if(req.body.adminCode === process.env.ADMIN_CODE) {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/stores"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//show profile info
router.get("/profile", isAdmin, isLoggedIn, function(req, res, next) {
    User.findOne({ _id: req.user._id }, function (err, foundUser){
         if (err){
             console.log(err);
             return next(err);
         };

      res.render("profile", { user: foundUser });
    });
});

//edit personal information
router.get("/edit", isAdmin, isLoggedIn, function(req, res, next){
    res.render("edit", {user: req.user});
});

router.put("/:id", isLoggedIn, function(req, res){
   var newData = {username: req.body.username, email: req.body.email, phone: req.body.phone, password: req.body.password};
    User.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, store){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("profile");
        }
    });
    
});



//craete new category
/*router.post("/admin", isAdmin, function(req, res){
  var text = req.body.text;
     var newCategory = {text: text};
    // Create a new Category and save to DB
    Category.create(newCategory, function(err, newlyCreated){
        if(err){
            console.log(err);
             req.flash("failureFlash", "Eroor" + err);
        } else {
            //redirect back to stores page
            console.log(newlyCreated);
             req.flash("success", "Successfully Added the catgory ");
            res.redirect("/admin");
        }
    });
  });
*/

//show Admin bage
router.get("/admin", function(req, res){
   res.render("admin", {page: 'admin'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/stores",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to Easy supply!'
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "See you later!");
   res.redirect("/stores");
});

// DELETE - removes account
router.delete("/:id", isLoggedIn, function(req, res) {
     req.user.remove(function(err) {
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/');
        }
    req.flash('error', 'user deleted!');
    res.redirect('/stores');
    });
});

module.exports = router;