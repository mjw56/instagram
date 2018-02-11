const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const includePaths = require('rollup-plugin-includepaths');
const babel = require('rollup-plugin-babel');
const scss = require('rollup-plugin-scss');
const { writeFileSync } = require('fs');

let includePathOptions = {
  include: {},
  paths: ['client'],
  external: [],
  extensions: ['.js', '.jsx']
};

const plugins = [
    nodeResolve({
      extensions: [ '.js', '.jsx' ]
    }),
    includePaths(includePathOptions),
    scss({
      output: function (styles, styleNodes) {
        writeFileSync('public/bundle.css', styles)
      },
    }),
    babel({
        exclude: 'node_modules/**',
        plugins: ['inferno'],
    })
  ]

rollup.rollup({
    input: 'client/pages/timeline/index.jsx',
    plugins
  }).then(bundle => {
    bundle.write({
      format: 'cjs',
      file: 'build/pages/timeline.js'
    })
  })
  