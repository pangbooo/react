const path = require('path');
const {merge} = require('webpack-merge')
const baseCongif = require('./webpack.config.base');

const clientConfig = {
    mode: 'development',
    entry: {
        app: './src/client/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../public/'),
        filename: 'index.js'
    }
}


module.exports = merge(baseCongif, clientConfig)
