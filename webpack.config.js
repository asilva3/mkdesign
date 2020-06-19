// webpack.config.js
const Dotenv = require('dotenv-webpack');
require('dotenv').config()
 
module.exports = {
  plugins: [
    new Dotenv({
    	path: './.env',
    	safe: true
    })
  ]
};