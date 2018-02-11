const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require('express-session');
const routes = require('./routes');
require('dotenv').config();

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
passport.use(require('./services/instagram/strategy'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', routes.utils.ensureAuthenticated, routes.home);
app.get('/login', routes.login);
app.get('/logout', routes.logout);

app.get('/auth/instagram', passport.authenticate('instagram-token'), routes.instagram.token);
app.get('/auth/instagram/callback', routes.instagram.callback);

app.listen(process.env.PORT, () => console.log('app listening on port 3000'));