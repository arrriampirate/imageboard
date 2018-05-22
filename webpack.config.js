const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin    = require('uglifyjs-webpack-plugin');

const extractCss        = new ExtractTextPlugin('../css/style.css');

module.exports = {

    mode: 'development',

    entry: path.join(__dirname, 'src/js/index'),

    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'bundle.js'
    },

    watch: true,

    module: {

        rules: [

            {
                test: /\.styl/i,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'csso-loader', 'postcss-loader', 'stylus-loader']
                })
            },

            {
                test: /\.js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }

        ]
    },

    plugins: [
        extractCss
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json'],
        unsafeCache: true
    },

    resolveLoader: {
        modules: ['node_modules'],
        mainFields: ['loader', 'main'],
        extensions: ['.js', '.json']
    },
};