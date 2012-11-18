
/**
 * Module dependencies
 */

var fs = require('fs'),
    u = require('underscore');

/**
 * Module definitions
 */

function getJavaScriptFiles(files){
  // A JavaScript file starting with an alphanumeric character
  var jsFile = /^([a-zA-Z0-9][^.]*)\.js$/;
  var jsFiles = [];
  u.each(files, function(file){
    var matches = jsFile.exec(file);
    if (matches) jsFiles.push(matches[1]);
  });
  return jsFiles;
}

function updateRouters(){
  fs.readdir('app/routers', function(err, files){
  if (err)
    return console.log('The contents of the routers directory could not be read');

  fs.readFile(__dirname + '/templates/routers.js.tpl', function (err, data) {
    if (err) throw err;

    var template = u.template(data.toString());

    var routers = getJavaScriptFiles(files);
    var deps = u(routers).map(function(router){
      return "'app/routers/" + router + "'";
    }).join(',\n  ');

    var content = template({
      deps: deps
    });

    var path = 'config/deps/routers.js';
    fs.writeFile(path, content, function(err){
      if (err) return console.log('Error writing to file %s', path);

      console.log('+++ %s\tRouters file successfully updated', path);
    });
  });
});
}

function updateInitializers(){
  fs.readdir('config/initializers', function(err, files){
    if (err)
      return console.log('The contents of the initializers directory could not be read');
  
    fs.readFile(__dirname + '/templates/initializers.js.tpl', function (err, data) {
      if (err) throw err;

      var template = u.template(data.toString());

      var initializers = getJavaScriptFiles(files);
      var deps = u(initializers).map(function(initializer){
        return "'config/initializers/" + initializer + "'";
      }).join(',\n  ');

      var content = template({
        deps: deps
      });

      var path = 'config/deps/initializers.js';
      fs.writeFile(path, content, function(err){
        if (err) return console.log('Error writing to file %s', path);

        console.log('+++ %s\tInitializers file successfully updated', path);
      });
    });
  });
}

/**
 * Module exports
 */

exports.updateInitializers = updateInitializers;
exports.updateRouters = updateRouters;
exports.update = function(){
  updateInitializers();
  updateRouters();
};