const passport = require('passport');

const LocalStrategy = require('passport-local');

const User = require('../models/user');

// authenticate using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function(req,email,password,done){
        // find the username and establish the identity
        User.findOne({email:email}, function(err,user){
            if(err){
                // console.log('Error in finding user --> Passport');
                req.flash('error',err);
                done(err);
            }

            if(!user || user.password != password){
                // console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/password');
                return done(null,false);
            }

            return done(null,user);
        });
    }
    ));

// serialize the user to decide which key is to kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserialize the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

// check if the user is authenticated
passport.login = function(req,res,next){
    // if user is signed in then pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.json(200, {
            message: "Entered information is wrong"
        })
    }
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending it to locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;