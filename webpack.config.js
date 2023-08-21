const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Path = require('path');

module.exports = {
    entry: Path.resolve(__dirname, './src/index.js'),
    output: {
        path: Path.resolve(__dirname, './dist'),
        filename: 'index.[contenthash:10].js',
        assetModuleFilename: Path.join('fonts', '[name].[contenthash][ext]'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:10].css',
        }),
    ],
    devServer: {
        watchFiles: Path.resolve(__dirname, './src'),
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: Path.join('images', '[name].[contenthash:10][ext]'),
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: Path.join('images', '[name].[contenthash:10][ext]'),
                },
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.js$/,
                include: Path.resolve(__dirname, './src'),
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    }
};