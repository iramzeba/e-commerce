var createError = require('http-errors'),
 express = require('express'),
 mongoose=require('mongoose')
 path = require('path'),
 bodyParser=require('body-parser'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 conn=require('./config/db'),
 indexRouter = require('./routes/index'),
 usersRouter = require('./routes/users'),
  flash = require('connect-flash'),
 session=require('express-session'),
 passport=require('passport'),
 LocalStrategy=require('passport-local'),
 passportLocalMongoose = require("passport-local-mongoose"), 
  MongoStore = require('connect-mongo')(session),
  $=require('jquery'),
 User=require('./model/Schema');

const { Passport } = require('passport');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//adding validator and session
 
var ssn;
app.use(session({
  
  //store:new MongoStore({mongooseConnection:mongoose.connection}),
  resave: false,
  saveUninitialized: false,
  secret: "secret",
  store:new MongoStore({mongooseConnection:mongoose.connection}),
  cookie: { secure: false, maxAge: 86400000 }

 }));
 app.use(flash());
app.use('/', indexRouter);
app.use('/users', usersRouter);




//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  ssn=req.session;
 
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.session.loggedIn;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(function (req,res,next) {
  res.locals.login=req.isAuthenticated();
  res.locals.session=req.session;
  next();
})

app.get('*',function (req,res,next) {
  res.locals.cart=req.session.cart;
  next();
})
module.exports = app;

