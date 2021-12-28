const passport = require('passport');
// const passportJwt = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const sequelize = require('./database');

const User = require('./../models').user;

// Look for Http only cookie called 'token' on client, then extract jwt token from there.
const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    return token;
};


const opts = {}
// Check for cookie, else look for Authorization header bearer token.
opts.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor,ExtractJwt.fromAuthHeaderAsBearerToken()]);
opts.secretOrKey = process.env.JWT_SECRET;
// console.log("jwtfromrequest: ",opts.jwtFromRequest);
// opts.passReqToCallback = true;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'http://localhost:3000';
// Modified for sequelize, since it uses then -> catch syntax for querying
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({where: {id: jwt_payload.id}})
    .then(user => {
        if (user){
            // AUTH SUCCESS
            // req.user = user; // added user to req.user, for middleware to access user information
            return done(null, user);
        } else {
            // AUTH NO USER
            done(null,false, {error: 'invalid user'})
        }
    })
    .catch(err => {
        // AUTH ERROR
        return done(err, false, {error: 'no user found'});
    });
}));

module.exports = passport;