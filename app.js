var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    Store  = require("./models/store"),
    Cart  = require("./models/cart"),
    Product  = require("./models/product"),
   Comment     = require("./models/comment"),
    User        = require("./models/user"),
    session = require("express-session"),
    MongoStore = require("connect-mongo")(session),
    seedDB      = require("./seeds"),
    methodOverride = require("method-override");
// configure dotenv
require('dotenv').load();

//requiring routes
var productRoutes    = require("./routes/products"),
    storeRoutes = require("./routes/stores"),
    cartRoutes = require("./routes/cart"),
   commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index")
    
mongoose.connect('mongodb://localhost:27017/Easy_supply1')
    
// assign mongoose promise library and connect to database
/*mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/Easy_supply';

mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));
*/
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
//require moment
app.locals.moment = require('moment');
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});


app.use("/", indexRoutes);
app.use("/stores", storeRoutes);
app.use("/cart", cartRoutes);
app.use("/stores/:id/products", productRoutes);
app.use("/stores/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});