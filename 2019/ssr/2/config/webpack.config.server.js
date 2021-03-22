const {merge} = require('webpack-merge');
const path = require('path');
var nodeExternals = require('webpack-node-externals');
const baseCongif = require('./webpack.config.base');

const serverCongif = {
    target: 'node',
    mode: 'development',
    externals: [nodeExternals()],
    entry: {
        app: './src/server/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build/'),
    }
}


module.exports = merge(baseCongif,serverCongif)
