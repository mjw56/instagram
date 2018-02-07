const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

const plugins = [
    babel({
        exclude: 'node_modules/**',
        plugins: ['inferno'],
    }),
  ]

rollup.rollup({
    input: 'app/pages/timeline.jsx',
    plugins
  }).then(bundle => {
    bundle.write({
      format: 'cjs',
      file: 'build/pages/timeline.js'
    })
  })
  