const authenticate = require("../services/instagram/authentication");

async function callback(req, res) {
    if (req.query.code) {
        const response = await authenticate(req.query.code);

        res.redirect(
            `/auth/instagram?access_token=${response.access_token}&user=${
                response.user
            }`
        );
    }
}

function token(req, res) {
    res.redirect("/");
}

module.exports = {
    callback,
    token
};
