const InstagramTokenStrategy = require("passport-instagram-token");

module.exports = new InstagramTokenStrategy(
    {
        clientID: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        return done(null, { accessToken, profile });
    }
);
