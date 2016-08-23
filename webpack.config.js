var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

var config = {
  context: __dirname + "/src",
  devtool: debug ? "inline-sourcemap" : null,

  entry: [

    './client/app/index.jsx'
  ],
  output: {
    path: __dirname + "/src/client/public",
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=react-html-attrs'],
      },
      {
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      }
    ]
  },


};

module.exports = config;
