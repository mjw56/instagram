const got = require("got");

const baseURL = "https://api.instagram.com/v1";

async function self(accessToken) {
    try {
        const user = await got(
            `${baseURL}/users/self?access_token=${accessToken}`
        );

        const body = JSON.parse(user.body);
        return body.data;
    } catch (error) {
        console.log(error.response.body);
    }
}

async function mediaRecent(accessToken) {
    try {
        const timeline = await got(
            `${baseURL}/users/self/media/recent/?access_token=${accessToken}`
        );

        const body = JSON.parse(timeline.body);
        return body;
    } catch (error) {
        console.log(error.response.body);
    }
}

const api = {
    users: {
        self,
        mediaRecent
    }
};

module.exports = api;
