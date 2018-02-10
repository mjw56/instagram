const got = require('got');
const r2 = require('r2');
const FormData = require('form-data');

async function getTimeline(id, accessToken) {
    try {
        const timeline = await got(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`);    
        return JSON.parse(timeline.body);
    } catch (error) {
        console.log(error.response.body);
    }
}

async function authenticateInstagram(code) {
    const formData = new FormData();
    formData.append('client_id', process.env.INSTAGRAM_CLIENT_ID);
    formData.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', 'http://localhost:3000/auth/instagram/callback');
    formData.append('code', code);

    let url = 'https://api.instagram.com/oauth/access_token';

    return await r2.post(url, { body: formData }).json;
  };

module.exports = {
    getTimeline,
    authenticateInstagram
}
