const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const includePaths = require('rollup-plugin-includepaths');
const babel = require('rollup-plugin-babel');
const sass = require('rollup-plugin-sass');
const copy = require('rollup-plugin-copy');
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
    sass({
      output(styles, styleNodes) {
        writeFileSync('public/bundle.css', styles)
      },
    }),
    babel({
        exclude: 'node_modules/**',
        plugins: ['inferno', '@babel/plugin-proposal-object-rest-spread'],
    }),
    copy({
      "client/media": "public/media",
      verbose: true
  })
  ]

rollup.rollup({
    input: 'client/pages/home/index.jsx',
    plugins
  }).then(bundle => {
    bundle.write({
      format: 'cjs',
      file: 'build/pages/home.js'
    })
  })
  