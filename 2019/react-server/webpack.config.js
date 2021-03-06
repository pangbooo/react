const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry:"./src/app.js",
    output:{
        filename: '[name].bundle.js',
        path :path.resolve(__dirname,'dist'),
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:"babel-loader",
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:["style-loader","css-loader"],
            },
            {
                test:/\.less$/,
                use:["less-loader","style-loader","css-loader"],
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    
}