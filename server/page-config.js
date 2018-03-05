module.exports = {
  '/': {
    title: 'Mini Instagram',
    jsFiles: ['index.js'],
    cssFiles: ['bundle.css'],
    dataFn: (data) => data.data.root.users.media.data
  }
}
