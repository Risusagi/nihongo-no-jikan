const webpack = require('webpack');
const dotenv = require('dotenv');

const envKeys = () => {
    const env = dotenv.config().parsed;
    
    return Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
};

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react', '@babel/preset-env'],
                            plugins: [
                                ['@babel/plugin-proposal-class-properties', {loose: true}],
                            ],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(html)$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(envKeys())
    ]
}