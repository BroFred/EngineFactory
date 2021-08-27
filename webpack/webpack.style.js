const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [{
            test: /\.css$/, include, exclude,
            use: ["style-loader", "css-loader"],
        },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use = [] }) => { // Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].css",
    });
    return {
        module: {
            rules: [{
                test: /\.css$/, include, exclude,
                use: [MiniCssExtractPlugin.loader,
                ].concat(use),
            },
            ],
        },
        plugins: [plugin],
    };
};
