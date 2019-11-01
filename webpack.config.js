const path = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        publicPath: '../'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/search.png'
                        }
                    }
                ]
            }
        ]
    }
}