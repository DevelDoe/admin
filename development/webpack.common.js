/**
 * @Author: Morgan Andree Ray
 * @Date:   29-04-2018
 * @Email:  info@andreeray.se
 * @Filename: webpack.common.js
 * @Last modified by:   Morgan Andree Ray
 * @Last modified time: 08-05-2018
 * @License: MIT
 */


const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const token = process.env.TOKEN || false

module.exports = {
    entry: {
        app: './source/root.js',
    },
    plugins: [
        new WriteFilePlugin(),
        new CleanWebpackPlugin(['../distribution']),
        new HtmlWebpackPlugin({
            title: 'wimse admin',
            template: 'index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: token ? path.resolve(__dirname, '../../server/app') : path.resolve(__dirname, '../distribution'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                ["env"]
                            ],
                            "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread", "transform-runtime"]
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        'js': 'babel-loader?presets[]=env'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
}
