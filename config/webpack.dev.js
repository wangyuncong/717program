let baseConfig = require("./webpack.base")
const webpack = require("webpack")
const DefinePlugin = webpack.DefinePlugin;
baseConfig.plugins.push(new DefinePlugin({
    "process.env":'"development"'
}))
module.exports = {
    ...baseConfig,
    devServer: {
        historyApiFallback: true,
        inline: true,
        open: true,
        port: 3000,
        noInfo:true
    },
    devtool: 'eval-source-map'
}