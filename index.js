const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// used for session cookie
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(cookieParser());

// mongo store is used to store session cookie in the db
app.use(session({
    name: 'baaz_assignment',
    secret: "abcdef",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('Error in running server');
    }
    console.log('Server is running on port ', port);
});