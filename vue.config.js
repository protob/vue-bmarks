

module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/0_var/_variables.scss"; @import "@/assets/scss/0_var/_mixins.scss";`
            }
        }
    },


    chainWebpack: config => {

        config.optimization.splitChunks({
            chunks: 'all'
        })

        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')

        config.module
            .rule("fonts")
            .test(/\.(ttf|otf|eot|woff|woff2)$/)
            .use("file-loader")
            .loader("file-loader")
            .tap(options => {
                options = {
                    name: '/assets/fonts/[name].[ext]',
                }
                return options
            })

    },

    pluginOptions: {

    }
};