
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

  var fileName = 'models/' + _s.slugify(_s.humanize(name)) + '.js';
  fs.stat('models', function(err, stat){
    if (err || !stat.isDirectory()) return console.log('The "models" directory does not exist');

    fs.stat(fileName, function(err, stat){
      if (!err) return console.log('The file %s already exists', fileName);

      fs.readFile(__dirname + '/templates/model.js.tpl', function (err, data) {
        if (err) throw err;

        var template = u.template(data.toString());

        var humanName = _s.humanize(name);

        var content = template({
          humanName: humanName,
          className: _s.classify(humanName) + 'Model'
        });

        fs.writeFile(fileName, content, function(err){
          if (err) return console.log('Error writing to file %s', fileName);

          console.log('+++ %s\tModel %s successfully created', fileName, name);
        });
      });

    });
  });

}