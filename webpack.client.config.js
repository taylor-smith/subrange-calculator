const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/client/index.tsx')
    ],
    output: {
        path: path.resolve(__dirname, 'private'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts[x]?$/,
                loader: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.[s]?css$/,
                loader: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(ico|png)$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ]
};