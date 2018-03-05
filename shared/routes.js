module.exports = ({ isServer }) => ([
  {
    path: '/',
    component: isServer ? require('../build/pages/home') : null,
    exact: true
  }
]);
