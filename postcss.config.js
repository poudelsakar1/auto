const tailwindcss = require('tailwindcss')
const cssnano = require('cssnano')
const purgecss = isWidget =>
  require('@fullhuman/postcss-purgecss')({
    // Specify the paths to all of the template files in your project
    content: [
      isWidget ? './src/widget/**/*.tsx' : './src/web/**/*.tsx',
      // etc.
    ],
    whitelist: ['body'],
    whitelistPatterns: [/^input-range/],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  })

module.exports = params => {
  return {
    plugins: [
      tailwindcss('./tailwind.config.js'),
      require('autoprefixer'),
      ...(process.env.NODE_ENV === 'production'
        ? [
            purgecss(
              params.webpack.context.toString().indexOf('src\\widget') !== -1,
            ),
            cssnano({
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                },
              ],
            }),
          ]
        : []),
    ],
  }
}
