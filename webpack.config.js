const path = require("path");
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const merge = require('webpack-merge');
const SentryPlugin = require('webpack-sentry-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
const release = require('./package.json').version + ':' + gitRevisionPlugin.version();

const buildPath = path.resolve(__dirname, 'dist');
const sourcePath = path.join(__dirname, 'src');

const ENV = process.env.NODE_ENV;
if (!ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}
const isProduction = ENV === 'production';

const envFile = './env/.env.' + ENV;
require('dotenv').config({
  path: envFile,
});

const common = {
  entry: ["./src/js/index.js"],

  output: {
    path: buildPath,
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    publicPath: '/'
  },

  devServer: {
    contentBase: buildPath,
    historyApiFallback: true
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|react-material-components)/,
        loader: "eslint-loader",
        options: {}
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.s?css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: 'file-loader',
        options: {
          name(file) {
            if (isProduction) {
              return '[hash].[ext]';
            }
            return '[path][name].[ext]';
          }
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash].[ext]',
        },
      },
    ]
  },

  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules/react')
    }
  },

  plugins: [
    new HtmlWebPackPlugin({
      path: buildPath,
      template: "src/index.html",
      filename: "index.html"
    }),

    new Dotenv({
      path: './env/.env.' + ENV,
      safe: './env/.env'
    }),

    new WebpackMd5Hash(),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'RELEASE': JSON.stringify(release)
    }),

    new webpack.EnvironmentPlugin("NODE_ENV"),

    new CopyWebpackPlugin([
      {
        from: sourcePath + '/locales',
        to: buildPath + '/locales/'
      }
    ], {})
  ]
};

let config;
if (isProduction) {
  config = merge(common, {
    output: {
      filename: '[name].[hash].js',
      sourceMapFilename: '[name].[hash].js.map'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      }),

      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ],
  });
}
else {
  config = merge(common, {
    output: {
      filename: '[name].js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 8080,
        proxy: 'http://localhost:8080',
        reload: false
      })
    ]
  });
}

if (process.env.SENTRY_ENABLED !== "0" && process.env.SENTRY_ENABLED.toUpperCase() !== "FALSE" &&
  process.env.SENTRY_API_KEY && process.env.SENTRY_PROJECT && process.env.SENTRY_API_KEY) {
  config = merge(config, {
    plugins: [
      new SentryPlugin({
        organization: process.env.SENTRY_ORGANIZATION,
        project: process.env.SENTRY_PROJECT,
        apiKey: process.env.SENTRY_API_KEY,
        suppressConflictError: true,
        release: release
      })
    ]
  });
}


module.exports = config;
