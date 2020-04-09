const path = require('path')
module.exports = {
  chainWebpack: config => {
    // const svgRule = config.module.rule('svg')

    // svgRule.uses.clear()

    // svgRule
    // 	.oneOf('inline')
    // 	.resourceQuery(/inline/)
    // 	.use('vue-svg-loader')
    // 	.loader('vue-svg-loader')
    // 	.end()
    // 	.end()
    // 	.oneOf('external')
    // 	.use('file-loader')
    // 	.loader('file-loader')
    // 	.options({
    // 		name: 'assets/[name].[hash:8].[ext]'
    // 	})

    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
    config

      .entry('app')
      .clear()
      .add('./src/main.js')
      .end()
    config.resolve.alias
      .set('~', path.join(__dirname, './src'))
      .set('@', path.join(__dirname, './src'))
      .set('#', path.join(__dirname, './src'))

    config.optimization.splitChunks({
      chunks: 'all'
    })

    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')

    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    config.module
      .rule('fonts')
      .test(/\.(ttf|otf|eot|woff|woff2)$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        options = {
          name: '/assets/fonts/[name].[ext]'
        }
        return options
      })
  },

  lintOnSave: false,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        // prependData: `@import "@/assets/scss/0_var/_variables.scss"; @import "@/assets/scss/0_var/_mixins.scss";`
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'src/')],
          indentedSyntax: false,
          prependData: `@import "~@/assets/scss/0_var/_variables.scss"; @import "~@/assets/scss/0_var/_mixins.scss";`
        }
      }
    }
  },

  pluginOptions: {}
}
