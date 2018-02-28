const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const includePaths = require('rollup-plugin-includepaths');
const babel = require('rollup-plugin-babel');
const sass = require('rollup-plugin-sass');
const copy = require('rollup-plugin-copy');
const replace = require('rollup-plugin-replace');
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
  ]

rollup.rollup({
    input: 'client/pages/home/index.jsx',
    plugins: plugins.concat(
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
    )
  }).then(bundle => {
    bundle.write({
      format: 'cjs',
      file: 'build/pages/home.js'
    })
  })

rollup.rollup({
  input: 'client/index.jsx',
  plugins: plugins.concat(
    sass(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['inferno', '@babel/plugin-proposal-object-rest-spread'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
  )
}).then(bundle => {
  bundle.write({
    format: 'cjs',
    file: 'public/index.js'
  })
})
  