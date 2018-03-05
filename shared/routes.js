module.exports = ({ isServer }) => ([
  {
    path: '/',
    component: isServer ? require('../build/pages/home') : require('../client/pages/home/index.jsx'),
    exact: true
  }
]);
