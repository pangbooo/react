module.exports = {
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', ['@babel/preset-env',{
                        targets: {
                            browsers: ['last 2 versions']
                          }
                    }]]
                }
            }
        ]
    }
}