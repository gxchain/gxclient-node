const path = require("path");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");

module.exports = {
    entry: "./lib/index",
    // mode: "development",
    // devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!gxbjs)/,
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
    // 在development模式里面会标记未用过的模块
    optimization: {
        usedExports: true
    },
    // 如果import module直接写 'gxbjs/es', mocha测试的时候会报错，看起来不会解析node_modules里面的es module。所以通过这种方式来使用es打包，以使用webpack的tree shaking功能减小包大小
    resolve: {
        alias: {
            "gxbjs/dist": path.resolve(__dirname, "node_modules/gxbjs/es")
        }
    },
    plugins: [
        // 用于生成原始bundle
        new UnminifiedWebpackPlugin(),
        // 用于依赖包大小分析
        // new BundleAnalyzerPlugin()
    ]
};
