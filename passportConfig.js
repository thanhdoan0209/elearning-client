const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./models/users')
var bcrypt = require('bcryptjs');

passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    async function (req, username, password, done) {
        try {
            const user = await users.findOne({ 'username': username })
            // In case of any error, return using the done method
            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false,
                    console.log('message', 'User Not found.'));
            }
            // User exists but wrong password, log the error 
            if (!(await isValidPassword(user, password))) {
                console.log('Invalid Password');
                return done(null, false,
                    console.log('message', 'Invalid Password'));
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            console.log(user)
            return done(null, user);
        } catch (err) {
            console.log(err);
            done(err)
            throw err;
        }
    })
);

const isValidPassword = async function (user, password) {
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
    users.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;