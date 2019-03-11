const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
 
module.exports = {
    entry: "./lib/index",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.js$/,
                include: /node_modules\/gxbjs\/es/,
                sideEffects: false
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "gxclient.min.js"
    },
    plugins: [
        // new UnminifiedWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ]
};
