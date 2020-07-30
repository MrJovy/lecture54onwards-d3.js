const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
}

module.exports = {
    entry: './src/app.js',
    output: {
        path: paths.dist,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.dist
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                //! copies data in data folder to dist for d3 manipulation
                from: paths.src,
                to: paths.dist
            }],
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}