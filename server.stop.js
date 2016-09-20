// var io = require('socket.io-client');
// var socketClient = io.connect('http://localhost'); // Specify port if your express server is not using default port 80

// socketClient.on('connect', () => {
//   socketClient.emit('npmStop');
//   setTimeout(() => {
//     process.exit(0);
//   }, 1000);
// });
// 
// 
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

new WebpackDevServer(webpack(config), config.devServer).close();