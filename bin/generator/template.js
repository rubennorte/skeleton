
/**
 * Module dependencies
 */

var fs = require('fs'),
    _s = require('underscore.string');

/**
 * Module exports
 */

exports.create = function(name){

  var fileName = _s.slugify(_s.humanize(name)),
      path = 'templates/' + fileName + '.html';

  fs.stat('templates', function(err, stat){
    if (err || !stat.isDirectory()) return console.log('The "templates" directory does not exist');

    fs.stat(path, function(err, stat){
      if (!err) return console.log('The file %s already exists', path);

      fs.writeFile(path, '', function(err){
        if (err) return console.log('Error creating file %s', path);

        console.log('+++ %s\tTemplate %s successfully created', path, name);
      });

    });
  });

};