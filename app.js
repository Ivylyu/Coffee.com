const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport')
const MongoStore = require('connect-mongo')(session);
const router = express.Router();

mongoose.connect(config.database);
let db = mongoose.connection;

//check connection
db.once('open', function(){
    console.log('Connected to MongoDB!');
})

//check for db error
db.on('error', function(err){
    console.log(err);
})

//init app
const app = express();

//Bring in models
let Menu = require('./modeldb/items');
//load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');//app.get('view engine') == pug

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname,'public')));

// //express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store:new MongoStore({ mongooseConnection: db }),
    cookie:{ maxAge:100*60*1000 }
}))

// //Express Messages Middleware
app.use(require('connect-flash')());
app.use((req,res,next)=>{
    res.locals.lohin = req.isAuthenticated;
    res.locals.messages = require('express-messages')(req,res);
    res.locals.session = req.session;
    next();
});


//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req,res,next)=>{
    res.locals.user = req.user || null;
    next();
})

//route files
let items = require('./routes/menu');
let users = require('./routes/users');
let index = require('./routes/index');

app.use('/menu',items)
app.use('/users',users)
app.use('/',index)


app.listen(3080, function(){
    console.log('Server is lisitening on port 3080!');
});