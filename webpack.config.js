let path = require('path');
let webpack = require('webpack');


module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index'
    ],
    devtool: 'eval-source-map',
    output: {
        path: __dirname,
        filename: 'app.js',
        publicPath: '/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }, {
            test: /(\.css|\.scss)$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')]
        }]
    }
};