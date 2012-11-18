
/**
 * Module dependencies
 */

var fs = require('fs'),
    u = require('underscore'),
    _s = require('underscore.string');

/**
 * Module exports
 */

exports.create = function(name){

  var fileName = _s.slugify(_s.humanize(name)),
      path = 'collections/' + fileName + '.js';

  fs.stat('collections', function(err, stat){
    if (err || !stat.isDirectory()) return console.log('The "collections" directory does not exist');

    fs.stat(path, function(err, stat){
      if (!err) return console.log('The file %s already exists', path);

      fs.readFile(__dirname + '/templates/collection.js.tpl', function (err, data) {
        if (err) throw err;

        var template = u.template(data.toString());

        var humanName = _s.humanize(name);

        var content = template({
          humanName: humanName,
          className: _s.classify(humanName) + 'Collection',
          fileName: fileName
        });

        fs.writeFile(path, content, function(err){
          if (err) return console.log('Error writing to file %s', path);

          console.log('+++ %s\tCollection %s successfully created', path, name);
        });
      });

    });
  });

};