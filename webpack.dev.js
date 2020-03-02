const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv');

const envKeys = (env) => {
    const envs = dotenv.config().parsed;

    return {
        ...Object.keys(envs).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(envs[next]);
            return prev;
        }, {}),
        'process.env.ENVIRONMENT': JSON.stringify(env.ENVIRONMENT)
    };
};

module.exports = (env) => {
    return merge(common, {
        mode: 'development',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin(envKeys(env))
        ],
        devServer: {
            hot: true,
            historyApiFallback: true
        }
    });
};