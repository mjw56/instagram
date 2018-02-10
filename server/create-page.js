const Inferno = require('inferno');
const InfernoServer = require('inferno-server');
const { createElement } = require('inferno-create-element');
const { getTimeline } = require('./services/instagram/api');

let cached = {};

function renderPage(page, data) {
    return InfernoServer.renderToString(
        createElement(page, data, null)
    );
}

async function home({ userId, accessToken }) {
    let timeline;

    if (!cached.timeline) {
        timeline = await getTimeline(userId, accessToken);
        cached.timeline = timeline;
    } else {
        timeline = cached.timeline;
    }

    return renderPage(require('../build/pages/timeline'), { data: timeline.data });
}

module.exports = {
    home
}