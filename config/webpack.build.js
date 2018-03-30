let baseConfig = require("./webpack.base")
const webpack = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const DefinePlugin = webpack.DefinePlugin;
baseConfig.plugins.push(new UglifyJsPlugin)
baseConfig.plugins.push(new DefinePlugin({
    "process.env":'"production"'
}))
module.exports = {
    ...baseConfig
}