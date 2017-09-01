const webpack = require('webpack')
const path = require('path')

const isProduction = process.argv.indexOf('-p') !== -1
const outputDir = isProduction ? 'build' : 'build'

const config = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, outputDir),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/js/lib')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader'   },
        ]
      }
    ]
  },
  plugins: [
    // Uncomment this if you to extract the vendor chunk into a separate file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   path: path.resolve(__dirname, outputDir),
    //   filename: 'vendor.js'
    // })
  ]
}

module.exports = config