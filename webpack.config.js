const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/client/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', //name is a replacement for whatever my entry point property is called. Can have multiple entry points.
        //contenthash will generate a hash which index.js automaticallly puts inside, helps prevent caching issues in browsers
        clean: true, //this will run dev from RAM rather than storing to HDD, and for npm run build it deletes old build files
        assetModuleFilename: '[name][ext]' //this makes sure that the name remains the same during compilation
    },
    devtool: 'source-map', // this allows us to actually map dist code to original source code (via a jsmap file). Can add more options if desired.
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist') //tells devServer what to serve
        },
        port: 3000,
        open: true, // this opens the browser automatically when saving
        hot: true, // uses hot reloading
        compress: true, //enables g-zip compression
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, //i makes it case insensitive
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Andrew\'s Page', // This is referenced in template.html and auto-inserted when we build
            filename: 'index.html',
            template: 'src/client/template.html',
        }),
        new BundleAnalyzerPlugin()
    ],
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx'],
      },
}