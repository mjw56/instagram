const got = require('got');

const baseURL = 'https://api.instagram.com/v1';

async function mediaRecent(accessToken) {
    try {
        const timeline = await got(`${baseURL}/users/self/media/recent/?access_token=${accessToken}`);

        const body = JSON.parse(timeline.body);
        return body;
    } catch (error) {
        console.log(error.response.body);
    }
}

const api = {
    users: {
        mediaRecent
    }
}

module.exports = api;
