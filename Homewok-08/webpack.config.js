const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server/server',
    output: {
        filename: './build-backend.js'
    },
    externalsPresets: { node: true },
    externals: [webpackNodeExternals ()],
}