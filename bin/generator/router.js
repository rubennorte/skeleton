
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

  var fileName = 'routers/' + _s.slugify(_s.humanize(name)) + '.js';
  fs.stat('routers', function(err, stat){
    if (err || !stat.isDirectory()) return console.log('The "routers" directory does not exist');

    fs.stat(fileName, function(err, stat){
      if (!err) return console.log('The file %s already exists', fileName);

      fs.readFile(__dirname + '/templates/router.js.tpl', function (err, data) {
        if (err) throw err;

        var template = u.template(data.toString());

        var humanName = _s.humanize(name);

        var content = template({
          humanName: humanName,
          className: _s.classify(humanName) + 'Router'
        });

        fs.writeFile(fileName, content, function(err){
          if (err) return console.log('Error writing to file %s', fileName);

          console.log('+++ %s\tRouter %s successfully created', fileName, name);
        });
      });

    });
  });

}