
/**
 * Module dependencies
 */

var connect = require('connect');
var fs = require('fs');
var path = require('path');
var updateDeps = require('./update-deps');
var u = require('underscore');

/**
 * Module exports
 */

// Postponed execution of routers and initializers update.
var updateRouters = u.debounce(updateDeps.updateRouters, 500),
    updateInitializers = u.debounce(updateDeps.updateInitializers, 500);

function onDirectoryChange(fn){
  return function(event, file){
    // Update when files are added to or removed from
    // initializers or routers directories
    if (event === 'rename'){
      fn();
    }
  };
}

exports.run = function(port){

  var port = parseInt(port, 10) || 4000;
  var dir = process.cwd();

  connect.createServer(
      connect.static(dir)
  ).listen(port);

  fs.watch(path.join(dir, 'config', 'initializers'), onDirectoryChange(updateInitializers));
  fs.watch(path.join(dir, 'app', 'routers'), onDirectoryChange(updateRouters));

  console.log('Started on port %d', port);
  console.log('Press Ctrl-C to shutdown server');

};