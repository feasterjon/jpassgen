const path = require('path');

module.exports = {
  entry: './src/assets/js/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
    filename: 'jpassgen.min.js',
    clean: true,
  },
  experiments: {
    topLevelAwait: true
  }
};
