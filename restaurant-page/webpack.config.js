const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/restaurant.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpg|jpeg|svg)$/i,
            type: 'asset/resource',
          }
        ],
      },
    plugins: [
        new HtmlWebPlugin({
            title: "Webpack App",
            filename: 'index.html',
            template: '/src/index.html',
        })
    ]
};