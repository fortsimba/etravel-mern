const bcrypt = require("bcryptjs");
const User = require("../models/users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
function constTryCatch() {
  try {
    const keys = require('./keys');
    return keys;
  } catch (e) {
    console.log("Please add keys.js to passport folder");
    const keys = {google: {
              clientID: 'a',
              clientSecret: 'a',
          }
        }
        return keys;
  }
}
const keys = constTryCatch();
console.log(keys);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
});

passport.use(
  new LocalStrategy({ usernameField: "email"}, (email, password, done) => {
    User.findOne({email: email})
        .then(user => {
          if(!user) {
            const newUser = new User({email, password});
            //hashing passwords
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                  return done(null, user);
                }).catch(err => {
                  return done(null, false, {message: err});
                });
              });
            });
          }
          else{
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if(err) throw err;
              if(isMatch){
                return done(null, user);
              }
              else{
                return done(null, false, {message: "Wrong Password"});
              }
            });
          }
        }).catch(err => {
          return done(null, false, {message: err});
        });
  })
);

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/api/auth/google-direct'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({thid_party_auth: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                // console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    thid_party_auth: profile.id,
                    name: profile.displayName,
                    email:profile.displayName
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);

module.exports = passport;
