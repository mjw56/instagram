const routes = require('./routes.master');

module.exports = routes.map(route => ({ ...route, component: require(`../build/${route.component}`) }));
