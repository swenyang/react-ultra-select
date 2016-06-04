var path = require("path")

module.exports = {
    devtool: "cheap-module-source-map",
    entry: {
        "example": ["./examples/Example"],
    },
    output: {
        path: __dirname,
        filename: "[name].js",
        publicPath: ""
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel"],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(gif|png|PNG|jpe?g|svg)$/,
                loader: "file-loader?name=images/[name].[hash].[ext]"
            },
        ]
    }
}
