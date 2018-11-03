var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/khaosat", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var surveyTemplate = require('./routes/surveyTemplate');
var survey = require('./routes/survey');

// Init App
var app = express();

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'tungdz',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/surveyTemplate', surveyTemplate);
app.use('/survey', survey);
// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
