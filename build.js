const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const scss = require('rollup-plugin-scss');
const { writeFileSync } = require('fs');

const plugins = [
    scss({
      output: function (styles, styleNodes) {
        writeFileSync('build/bundle.css', styles)
      },
    }),
    babel({
        exclude: 'node_modules/**',
        plugins: ['inferno'],
    })
  ]

rollup.rollup({
    input: 'client/pages/timeline/timeline.jsx',
    plugins
  }).then(bundle => {
    bundle.write({
      format: 'cjs',
      file: 'build/pages/timeline.js'
    })
  })
  