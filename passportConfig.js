const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./models/users')
var bcrypt = require('bcryptjs');

passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        console.log(username, password)
        // check in mongo if a user with username exists or not
        users.findOne({ 'username': username },
            function (err, user) {
                console.log(user)
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(null, false,
                        console.log('message', 'User Not found.'));
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false,
                        console.log('message', 'Invalid Password'));
                }
                // User and password both match, return user from 
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));

var isValidPassword = async function (user, password) {
    try {
        const res = await bcrypt.compare(password, user.password);
        return res;
    } catch (err) {
        throw err;
    }
}

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;