const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const nodeModules = fs.readdirSync(path.relative('./', 'node_modules')).reduce((result, m) => {
    if (m !== '.bin') {
        result[m] = 'commonjs ' + m;
    }
    return result;
}, {});

module.exports = {
    entry: {
        'server.js': './src/server/server.ts'
    },
    output: {
        path: path.resolve(__dirname, 'private'),
        filename: '[name]',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    target: 'node',
    externals: nodeModules,
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts'],
        enforceExtension: false
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }]
    }
}