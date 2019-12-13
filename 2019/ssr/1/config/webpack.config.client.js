const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require('./webpack.config.base');
const util = require('./util');
const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        app: './src/entry-client.js', //默认值为 ./src
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[chunkhash].js',
        publicPath: '/dist/', 
        //publicPath 打包后输出路径以/dist/开头 (dist/index.html => <script type="text/javascript" src="/dist/static/js/app.1802afb2c815bb827745.js"></script>)
    },
    module: {
        rules: [
            ...util.styleLoaders({
                sourceMap: isProd ? true : false,
                usePostCSS: true,
                extract: isProd ? true : false
            })
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin() 默认生成 dist/index.html
        new HtmlWebpackPlugin({ 
            filename: "index.html",
            template: path.resolve(__dirname,"../index.html")
          })
    ]
});

if (isProd) {
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash].css"
        })
    )
}
// console.log('clientWebpack------', JSON.stringify(webpackConfig, null, 2));
module.exports = webpackConfig;