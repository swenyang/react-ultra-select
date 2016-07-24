var path = require("path")
var webpack = require('webpack')

var isProd = process.env.NODE_ENV === 'production'

var config = {
    entry: {
        "react-ultra-select": ["./src/UltraSelect.js"],
    },
    externals: {
        "react": "react",
        "react-dom" : "react-dom",
        "iscroll-react" : "iscroll-react",
        "iscroll/build/iscroll-probe" : "iscroll/build/iscroll-probe",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: isProd ? "[name].min.js" : "[name].js",
        library: "react-ultra-select",
        libraryTarget: "umd"
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
            }
        ]
    }
}

if (isProd) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false
        })
    )
}

module.exports = config
