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
    }
}