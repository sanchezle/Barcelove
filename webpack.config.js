const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/Index.jsx', // Entry point to your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'main.js' // Output file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Directory to serve files from
    port: 3000 // Port number for development server
  }
};
