module.exports = {
    mode: "production",
    entry: "./js/index.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/js",
    },
    watch: true,

    devtool: "source-map",
}