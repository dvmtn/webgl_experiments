module.exports = {
  entry: './js/init.js',
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  resolve:{
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl'
      }
    ]
  }
};
