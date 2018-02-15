const Inferno = require('inferno');
const InfernoServer = require('inferno-server');
const { createElement } = require('inferno-create-element');
const { getTimeline } = require('./services/instagram/api');

const schema = require('../shared/graphql');
const { graphql } = require('graphql');

let cached = {};

function renderPage(page, data) {
    return InfernoServer.renderToString(
        createElement(page, data, null)
    );
}

async function home({ accessToken }) {
    const TimelineComponent = require('../build/pages/timeline');

    const { data: { media: { data }}} = await graphql(schema, TimelineComponent.GraphQL({ accessToken }));

    return renderPage(TimelineComponent, { data });
}

module.exports = {
    home
}
