module.exports = (req, res) => {
    const CALLBACK = `http://localhost:${
        process.env.PORT
    }/auth/instagram/callback`;
    const URL = `https://api.instagram.com/oauth/authorize/?client_id=${
        process.env.INSTAGRAM_CLIENT_ID
    }&redirect_uri=${CALLBACK}&response_type=code`;
    res.render("login", { url: URL });
};
