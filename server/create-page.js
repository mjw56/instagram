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

async function timeline(req, res) {
    let timeline;

    if (!cached.timeline) {
        timeline = await getTimeline(req.user.profile.id, req.user.accessToken);
        cached.timeline = timeline;
    } else {
        timeline = cached.timeline;
    }

    const string = renderPage(require('../build/pages/timeline'), { data: timeline.data });

    res.send(string);
}

module.exports = {
    timeline
}