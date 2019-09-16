const easyimport = require('postcss-easy-import')

const clean = require('postcss-clean')
const purgeCSS = require('@fullhuman/postcss-purgecss')
const purgeConfig = {
  content: ['./.build/**/*.html'],
  extractors: [{
    extractor: class TailwindExtractor {
      static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
      }
    },
    extensions: ['html']
  }]
}


module.exports = ({
  env
}) => ({
  parser: 'postcss-scss',
  plugins: [
    easyimport(),
    // sass(),
    require('tailwindcss')('tailwind.js'),
    require('autoprefixer')(),
    // env === 'production' ? clean() : false,
    // env === 'production' ? purgeCSS(purgeConfig) : false,
  ]
})