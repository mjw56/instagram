const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const routes = require('./routes');
const createPage = require('./create-page');
const { authenticateInstagram } = require('./services/instagram/api');

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
passport.use(require('./services/instagram/strategy'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
        
    return res.redirect('/login');
}

app.get('/', ensureAuthenticated, createPage.timeline);
app.get('/login', routes.login);
app.get('/logout', routes.logout);


app.get('/auth/instagram', passport.authenticate('instagram-token'), (req, res) => {
    res.redirect('/');
});

app.get('/auth/instagram/callback', async (req, res) => {
    if (req.query.code) {
        const response = await authenticateInstagram(req.query.code);

        res.redirect(`/auth/instagram?access_token=${response.access_token}&user=${response.user}`);
    }
});

app.listen(3000, () => console.log('app listening on port 3000'));