process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
require('ignore-styles');
require('babel-register')({
    ignore: [ /(node_modules)/ ],
    presets: ['es2015', 'react-app', 'node6'],
    plugins: [
      'syntax-dynamic-import',
      'dynamic-import-node',
      'react-loadable/babel'
    ]
});
require('./index');