const path = require('path');
const os = require('os');
const resolve = dir => path.join(__dirname, dir);
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'html'];
const isProduction = process.env.NODE_ENV === 'production';
const pjson = require('./package.json');
const outputDir = './dist/' + pjson.name + (process.env.VUE_APP_API_ENV === 'uat' ? "-UAT" : "-PRODUCTION") + "-" + pjson.version;

module.exports = {
    publicPath: '/',
    outputDir,
    configureWebpack: {},
    chainWebpack: config => {
        if (isProduction) {
            config.plugin('CompressionWebpackPlugin').use(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            config.plugin('FileManagerPlugin').use(
                new FileManagerPlugin({
                    onEnd: {
                        delete: [`./${outputDir}.zip`],
                        archive: [
                            {source: `./${outputDir}`, destination: `./${outputDir}.zip`},
                        ]
                    }
                })
            );
        }

        // config.module.rule('images').use('url-loader').tap(options => {
        //     options.limit = 1;
        //     options.fallback.options = {
        //         name: '[name].[hash:8].[ext]',
        //         publicPath: `/`,
        //         emitFile: false
        //     };
        //     return options;
        // }).end();

        config.plugin('AddAssetHtmlPlugin').use(new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, './public/static/fonts/*.css'),
            publicPath: '/static/fonts',
            typeOfAsset: 'css',
            hash: true
        }));
    },
    productionSourceMap: !isProduction,
    transpileDependencies: [
        'vuex-persist'
    ],
    css: {
        // extract CSS in components into a single CSS file (only in production)
        // can also be an object of options to pass to extract-text-webpack-plugin
        extract: isProduction,

        // enable CSS source maps?
        sourceMap: !isProduction,

        // pass custom options to pre-processor loaders. e.g. to pass options to
        // sass-loader, use { sass: { ... } }
        loaderOptions: {}

        // Enable CSS modules for all css / pre-processor files.
        // This option does not affect *.vue files.
        // modules: false
    },
    parallel: os.cpus().length > 1,
    lintOnSave: false,
    devServer: {
        // port: 8802,
        // proxy: {
        //     '*': {
        //         target: '*',
        //         changeOrigin: true
        //     }
        // },
        // disableHostCheck: true,
    },
};
