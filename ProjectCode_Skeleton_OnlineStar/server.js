/**
 * Created by Sundar on 12/8/16.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
//var MongoClient = require('mongodb').MongoClient;
app.use(cors());

var User = require('./server/controllers/UserController');
var Product = require('./server/controllers/ProductController');
User.saveAdmin();
Product.saveProducts();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FEWD-Complex-Sc-1');

app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({secret: 'secret key', resave: true, saveUninitialized: true,cookie: { path: '/', httpOnly: true, maxAge: 30 * 300000 },rolling: true}));

require("./server/routes.js")(app);

app.listen(port);
console.log('App is listening on port: ' + port);