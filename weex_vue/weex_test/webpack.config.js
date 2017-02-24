// You can install more packages below to config more as you like:
// eslint
// babel-eslint
// eslint-config-standard
// eslint-loader
// eslint-plugin-html
// eslint-plugin-promise
// eslint-plugin-standard
// postcss-cssnext

var path = require('path')
// var webpack = require('webpack')
// var publicPath = 'http://localhost:3000/';
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var fs = require('fs');

var entry = {};

function walk(dir) {
    dir = dir || '.'
    var directory = path.join(__dirname, './src', dir);
    fs.readdirSync(directory)
        .forEach(function(file) {
            var fullpath = path.join(directory, file);
            var stat = fs.statSync(fullpath);
            var extname = path.extname(fullpath);
            if (stat.isFile() && extname === '.we') {
                var name = path.join('./', 'build', dir, path.basename(file, extname));
                entry[name] = fullpath + '?entry=true';
            } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
                var subdir = path.join(dir, file);
                walk(subdir);
            }
        });
}

walk();

// var bannerPlugin = new webpack.BannerPlugin(
//   '// { "framework": "Vue" }\n',
//   { raw: true }
// )

function getBaseConfig () {
  return {
    entry: entry,
    //     {
    //   app:[path.resolve('./app.js'), hotMiddlewareScript],
    //   // app: path.resolve('./app.js')
    // },
    output: {
      path: '.',
        filename:'[name].js'
    },
    module: {
      // // You can use ESLint now!
      // // Please:
      // // 1. npm install {
      // //   babel-eslint
      // //   eslint
      // //   eslint-config-standard
      // //   eslint-loader
      // //   eslint-plugin-html
      // //   eslint-plugin-promise
      // // } --save-dev
      // // 2. set .eslintrc
      // //   take { "extends": "standard" } for example
      // //   so you need: npm install eslint-plugin-standard --save-dev
      // // 3. set the config below
      // preLoaders: [
      //   {
      //     test: /\.vue$/,
      //     loader: 'eslint',
      //     exclude: /node_modules/
      //   },
      //   {
      //     test: /\.js$/,
      //     loader: 'eslint',
      //     exclude: /node_modules/
      //   }
      // ],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }, {
          test: /\.vue(\?[^?]+)?$/,
          loader: []
        }, {
              test: /\.we(\?[^?]+)?$/,
              loader: 'weex'
          }
      ]
    },
    vue: {
      // // You can use PostCSS now!
      // // Take cssnext for example:
      // // 1. npm install postcss-cssnext --save-dev
      // // 2. write `var cssnext = require('postcss-cssnext')` at the top
      // // 3. set the config below
      // postcss: [cssnext({
      //   features: {
      //     autoprefixer: false
      //   }
      // })]
    },
    plugins:[
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
    ]
     // [bannerPlugin]
  }
}

var webConfig = getBaseConfig()
// webConfig.output.filename = '[name].web.js'
// webConfig.module.loaders[1].loaders.push('vue')
var weexConfig = getBaseConfig()
// weexConfig.output.filename = '[name].weex.js'
// weexConfig.module.loaders[1].loaders.push('weex')

module.exports = [
    // webConfig,
    weexConfig]
