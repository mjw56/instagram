const createPage = require('../utils/create-page');

module.exports = async (req, res) => {
    const home = await createPage.home({
        id: req.user.profile.id,
        accessToken: req.user.accessToken,
        component: require('../../build/pages/home'),
        url: req.url
    });

    res.send(home);
}