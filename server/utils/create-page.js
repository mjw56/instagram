const Inferno = require('inferno');
const renderPage = require('./render-page');

const schema = require('../../shared/graphql');
const { graphql } = require('graphql');

async function home({ component, accessToken }) {
    const { data: { root } } = await graphql(schema, component.GraphQL({ accessToken }));
    
    return renderPage(
        component, 
        { title: 'Mini Instagram', jsFiles: ['index.js'], cssFiles: ['bundle.css'] }, 
        { data: root.users.media.data }
    );
}

module.exports = {
    home
}
