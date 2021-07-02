const Dotenv = require('dotenv-webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SOURCE_FOLDER = path.resolve(__dirname, 'src')
const WEB_ROOT = path.resolve(SOURCE_FOLDER, 'web')
const WIDGET_ROOT = path.resolve(SOURCE_FOLDER, 'widget')

const getEntries = (isWidget = false) => {
  // if (process.env.NODE_ENV === 'production') {
  //   return {
  //     'ninja-reactjs': path.resolve(WEB_ROOT, 'index'),
  //     'aln-react-widget': path.resolve(WIDGET_ROOT, 'index'),
  //   }
  // }

  if (isWidget) {
    return {
      'aln-react-widget': path.resolve(WIDGET_ROOT, 'index'),
    }
  }

  return {
    'ninja-reactjs': path.resolve(WEB_ROOT, 'index'),
  }
}

const findPara = param => {
  let result = ''

  process.argv.forEach(argv => {
    if (argv.indexOf('--' + param) === -1) return
    result = argv.split('=')[1]
  })

  return result
}

module.exports = () => {
  const entryDev = findPara('entryDev')
  const isWidget = entryDev === 'widget'

  return {
    entry: getEntries(isWidget),
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        // we use babel-loader to load our jsx and tsx files
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          // exclude: /node_modules/,
          use: ['file-loader?name=[name].[ext]'], // ?name=[name].[ext] is only necessary to preserve the original file name
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `./${isWidget ? 'widget-template' : 'public'}/index.html`,
        favicon: './public/favicon.ico',
      }),
      new Dotenv(),
    ],
  }
}
