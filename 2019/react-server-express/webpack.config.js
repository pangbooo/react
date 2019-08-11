const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry:"./app/index.js",
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
                // include: path.resolve(__dirname, "app"),
                loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
                // use:[{
                //     loader: "style-loader!css?modules&localIdentName=[name]__[local]-[hash:base64:5]"
                // },{ 
                //     loader:"css-loader!css?modules&localIdentName=[name]__[local]-[hash:base64:5]"
                // }],
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