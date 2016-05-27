var path = require("path")

module.exports = {
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
        filename: "[name].js",
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
