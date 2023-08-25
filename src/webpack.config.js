const path = require('path');

module.exports = {
  entry: './src/index.js', // The entry point of your React code
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Where the compiled file will go
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
