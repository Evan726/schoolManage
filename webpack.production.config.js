var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var productionConfig = [{
    entry: {
        main: './src/main.js',
        login: './src/login.js',
        common: ['react', 'react-dom', 'jquery']
    },
    output: {
        filename: "./js/bundle_[name].js",
        path: path.resolve(__dirname, './dist'),
        chunkFilename: "./js/chunk_[name].min.js",
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style!css')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css!less')
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=50000&name=./images/[name].[ext]'
        }],
        postLoaders: [{
            test: /\.(js|jsx)?$/,
            loaders: ['es3ify-loader']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("common", "./js/common.js"),
        new ExtractTextPlugin('./css/css_[name].css'), //单独使用style标签加载css并设置其路径
        new webpack.ProvidePlugin({ //加载jq
            $: 'jquery'
        })
    ]
}];

module.exports = productionConfig;