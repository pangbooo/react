const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require("./webpack.config.base");
const nodeExternals = require("webpack-node-externals");
const babelConfig = require("../.babelrc");
const util = require("./util");

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        app: './src/entry-server.js',
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: 'entry-server.js',
        libraryTarget: "commonjs2"  // 打包成commonjs2规范，//为了以commonjs2规范导出渲染函数，以给采用nodejs编写的HTTP服务调用
    },
    target: 'node', // 指定node运行环境,不会将nodejs内置模块打包进输出文件中，例如： fs net模块等；
    externals: [
        //为了不把node_modeuls目录下的第三方模块打包进输出文件中
        // 不绑定node模块，保留为 require()
        nodeExternals({
            whiteList: [/\.css$/] // 忽略css，让webpack处理
        })
    ],
    module: {
        rules: [
            ...util.styleLoaders({
                sourceMap: true,
                usePostCSS: true,
                extract: true
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "propcess.env.REACT_ENV": JSON.stringify('server') //指定React环境为服务端
        }),
        // 服务端不支持window document等对象，需将css外链
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash].css"
        })
    ]

});
module.exports = webpackConfig