var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./libs/db');
// var taskController = require('./controllers/taskController');
// var userController = require('./controllers/userController');
// var authController = require('./controllers/authController');
var config = require('./config/dev/dev');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//ROUTERS
var indexRouter = require('./routes/index');
var editRouter = require('./routes/edit');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');

var app = express();


// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//APP MIDDLEWIRE SETUP
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	store: new MongoStore({ url: config.db.mongo}, ()=>{console.log('storage is added');}),
	secret: config.db.secret,
	resave: false,
	saveUninitialized: false
}));
//PASSPORT.JS
app.use(passport.initialize());
app.use(passport.session());

app.get('/', indexRouter);
app.use('/edit', editRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter)

//APP ROUTUNG SETUP
//API
// app.get('/api/tasks/', taskController.findAll);
// app.get('/api/tasks/:taskID', taskController.findByID);
// app.post('/api/tasks/', taskController.createTask);
// app.put('/api/tasks/:taskID', taskController.editTask);
// app.delete('/api/tasks/:taskID', taskController.deleteTask);
// app.get('/api/users/', userController.findAll);
// app.get('/api/users/:userID', userController.findByID);
// app.post('/api/users/', userController.regUser);
// app.put('/api/users/:userID', userController.editUser);
// app.delete('/api/users/:userID', userController.deleteUser);

//ROUTES
// app.get('/register', (req, res)=>{res.render('register')})
// app.post('/register', userController.regUser);

// app.get('/login', (req, res)=>{res.render('login')})
// app.post('/login', authController.login);
//CATCH 404 AND FRWD TO ERR HANDLER
app.use(function(req, res, next) {
  next(createError(404));
});

//ERR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //RENDER ERR HANDLER
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
