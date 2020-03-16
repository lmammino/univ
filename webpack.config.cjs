const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, 'public'),
    contentBasePublicPath: '/public'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My library',
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    }),
    new HtmlWebpackTagsPlugin({ tags: ['public/wing.css', 'public/style.css'], append: true }),
    new HtmlWebpackRootPlugin()
  ]
}
