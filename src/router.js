
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
      path = 'app/routers/' + fileName + '.js';

  fs.stat('app/routers', function(err, stat){
    if (err || !stat.isDirectory()) return console.log('The "routers" directory does not exist');

    fs.stat(path, function(err, stat){
      if (!err) return console.log('The file %s already exists', path);

      fs.readFile(__dirname + '/templates/router.js.tpl', function (err, data) {
        if (err) throw err;

        var template = u.template(data.toString());

        var humanName = _s.humanize(name);

        var content = template({
          humanName: humanName,
          className: _s.classify(humanName) + 'Router',
          fileName: fileName
        });

        fs.writeFile(path, content, function(err){
          if (err) return console.log('Error writing to file %s', path);

          console.log('+++ %s\tRouter %s successfully created', path, name);
        });
      });

    });
  });

};