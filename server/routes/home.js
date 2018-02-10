const createPage = require('../create-page');

module.exports = async (req, res) => {
    const home = await createPage.home({
        id: req.user.profile.id,
        accessToken: req.user.accessToken
    });

    res.send(home);
}