const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                        loader: 'babel-loader',
                    }
                    
                
            },


            {
                test : /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },


            {
                test: /\.(css|s[ac]ss)$/i,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },

            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                      use: [
                         {
                        loader: 'file-loader',
                           options: {
                                 name: 'images/[hash]-[name].[ext]',
                               },
                         },
                         ],
               },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    devServer:{
        allowedHosts: path.join(__dirname, 'dist'),
        compress: true,
        port: 3005,
    },
    devServer: {
        historyApiFallback: true,
    }
}