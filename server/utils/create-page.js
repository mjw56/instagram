const Inferno = require('inferno');
const renderPage = require('./render-page');

const schema = require('../../shared/graphql');
const { graphql } = require('graphql');

async function home({ component, accessToken, url }) {
    const { data: { root } } = await graphql(schema, component.GraphQL({ accessToken }));
    
    return renderPage({
        component, 
        pageElements: { 
            title: 'Mini Instagram', 
            jsFiles: ['index.js'], 
            cssFiles: ['bundle.css'] 
        }, 
        props: { data: root.users.media.data, url },
    });
}

module.exports = {
    home
}
