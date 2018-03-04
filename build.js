require('dotenv').config();

const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const includePaths = require('rollup-plugin-includepaths');
const commonJS = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const sass = require('rollup-plugin-sass');
const copy = require('rollup-plugin-copy');
const alias = require('rollup-plugin-alias');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify');
const { writeFileSync } = require('fs');

const isProduction = process.env.NODE_ENV === 'production';
const extensions = ['.mjs', '.js', '.jsx'];

let includePathOptions = {
  include: {},
  paths: ['client'],
  external: [],
  extensions
};

const plugins = [
  commonJS(),
  nodeResolve({
    module: true,
    extensions: [ '.js', '.jsx' ]
  }),
  includePaths(includePathOptions),  
];

let clientPlugins = plugins.concat(
  sass(),
  babel({
    exclude: 'node_modules/**',
    plugins: ['inferno', '@babel/plugin-proposal-object-rest-spread'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify( 'development' )
  })
);

if (isProduction) {
  clientPlugins.push(uglify());
} else {
  // When in development, we want to use dev build of inferno.
  // DEV build has helper functionalities build for development only.
  // When we are shipping to production we don't want those checks to be included
  clientPlugins.unshift(
    alias({
      resolve: extensions,
      'inferno': __dirname + '/node_modules/inferno/dist/index.dev.mjs'
    })
  )
}

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
});

rollup.rollup({
  input: 'client/index.jsx',
  plugins: clientPlugins
}).then(bundle => {
  bundle.write({
    format: 'iife',
    file: 'public/index.js'
  })
});
  