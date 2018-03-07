module.exports = {
  // TODO: automate this with build
  '/': {
    title: 'Mini Instagram',
    jsFiles: ['chunk1.js', 'index.jsx.js'],
    cssFiles: ['bundle.css'],
    dataFn: (data) => data.data.root.users.media.data
  }
}
