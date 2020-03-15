const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My library',
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    }),
    new HtmlWebpackTagsPlugin({ tags: ['wing.css', 'style.css'], append: true })
  ]
}
