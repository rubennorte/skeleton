
/**
 * Configures RequireJS to be used with the app
 */

var path = require('path');
var requirejs = require('requirejs');

var srcDir = path.join(__dirname, '..', 'src');

// Configure requirejs for the project
requirejs.config({
  nodeRequire: require,
  baseUrl: srcDir
});
requirejs('config/require');

// Redefine baseUrl because it may have been modified in config/require
requirejs.config({baseUrl: srcDir});

// Export RequireJS
module.exports = requirejs;