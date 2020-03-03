const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = (env) => {
  return merge(common, {
    mode: "production",
    entry: {
      kuromoji: './node_modules/kuromoji/build/kuromoji.js',
      index: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[name][contentHash].js"
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
          loader: 'file?name=[name].[ext]'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin(
        {
          template: './public/index.html',
          chunks: ['kuromoji', 'index'],
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
          },
          favicon: 'src/assets/icon.png'
        }
      ),
      new webpack.DefinePlugin( {'process.env.ENVIRONMENT': JSON.stringify(env.ENVIRONMENT) }),
      // files for reading assistant furigana creation
      new CopyPlugin([
        { from: './node_modules/kuromoji/dict', to: './kuromoji/dict' },
      ]),
      // change path to kuromoji files (reading assistant) as github pages
      new ReplaceInFileWebpackPlugin([
        {
          dir: 'dist',
          test: /\.js$/i,
          rules: [
            {
              search: 'node_modules/',
              replace: ''
            }
          ]
        }
      ]),
    ],
    optimization: {
      minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
    }
  })
};