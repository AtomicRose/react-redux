const common = require('./common');
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const SOURCE_MAP = false;
const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';
const ENV_ALPHA = 'alpha';
const ENV_TEST = 'test';

const env = process
  .env
  .NODE_ENV
  .trim();

const config = {
  node: {
    __filename: true
  },
  entry: {
    app: path.join(common.path.src, 'app.js'),
    vender: [
      'history',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: path.join(common.path.dist, 'static'),
    publicPath: common.DEPLOY_SERVICE_PATH + '/static'
  },
  resolve: {
    extensions: [
      '.js', '.jsx'
    ], // 此选项不再需要传一个空字符串。
    alias: {
      ASSET: path.resolve(common.path.src, 'assets'),
      COMPONENT: path.resolve(common.path.src, 'components'),
      ACTION: path.resolve(common.path.src, 'actions'),
      REDUCER: path.resolve(common.path.src, 'reducers'),
      STORE: path.resolve(common.path.src, 'store'),
      ROUTE: path.resolve(common.path.src, 'routes'),
      SERVICE: path.resolve(common.path.src, 'services'),
      UTIL: path.resolve(common.path.src, 'utils'),
      VIEW: path.resolve(common.path.src, 'views'),
      CONSTANT: path.resolve(common.path.src, 'utils/constant'),
      REQUEST: path.resolve(common.path.src, 'utils/request'),
      SCSS: path.resolve(common.path.src, 'assets/scss')
    }
  },
  resolveLoader: {
    modules: ['src', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          retainLines: true,
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        },
        include: common.path.src,
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        use: {
          loader: 'json'
        }
      }, {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url',
          options: {
            limit: 10240, // 10KB 以下使用 base64
            name: 'img/[name]-[hash:6].[ext]'
          }
        }
      }, {
        test: /\.woff/,
        loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf/,
        loader: 'file?prefix=font/'
      }, {
        test: /\.eot/,
        loader: 'file?prefix=font/'
      }, {
        test: /\.svg/,
        loader: 'file?prefix=font/'
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __APP_ID__: JSON.stringify(common.APP_ID),
    __DEV__: env === 'development',
    __TEST__: env === 'test',
    __ALPHA__: env === 'alpha',
    __PROD__: env === 'production',
    __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
    __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
  }), new webpack.BannerPlugin(new Date().toISOString())]
};

if (process.env.NODE_ENV === ENV_PRODUCTION || process.env.NODE_ENV === ENV_ALPHA || process.env.NODE_ENV === ENV_TEST) {
  config.output.filename = '[name].[chunkhash:6].js';
  config.output.chunkFilename = '[id].[chunkhash:6].js';
  config
    .plugins
    .push(new CleanWebpackPlugin('dist', {
      root: common.path.rootPath,
      verbose: false
    }), new CopyWebpackPlugin([
      {
        context: common.path.staticDir,
        from: '**/*',
        ignore: ['*.md']
      }
    ]), new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }), new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }), new webpack.optimize.AggressiveMergingPlugin(), new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 30000 }), new ExtractTextPlugin({ filename: '[name].[contenthash:6].css', allChunks: true }), new HtmlWebpackPlugin({ filename: '../index.html', template: common.path.indexHTML, chunksSortMode: "dependency" }));
}
if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
  config.output.filename = '[name].js';
  config.output.chunkFilename = '[id].js';
  config.output.publicPath = '/';
  // add hot-reload
  config.entry.app = ['eventsource-polyfill', 'webpack-hot-middleware/client?reload=true', 'webpack/hot/only-dev-server', config.entry.app];
  // add dev rules
  config
    .module
    .rules
    .push({
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      exclude: /(node_modules|bower_components|\.spec\.js)/,
      use: [
        {
          loader: 'eslint-loader',
          options: {
            failOnWarning: false,
            failOnError: true
          }
        }
      ]
    });
  // plugins
  config
    .plugins
    .push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new ExtractTextPlugin('[name].css'), new HtmlWebpackPlugin({ filename: 'index.html', template: common.path.indexHTML, chunksSortMode: 'none' }), new BrowserSyncPlugin({
      host: '127.0.0.1',
      port: 9090,
      proxy: 'http://127.0.0.1:9000/',
      logConnections: false,
      notify: false
    }, { reload: false }));
}

module.exports = config;