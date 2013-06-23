
/**
 * Module dependencies
 */

var fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    wrench = require('wrench');

/**
 * Module exports
 */

exports.create = function(dst){
  
  var boilerplateSrc = path.join(__dirname, '..', 'res', 'boilerplate');

  fs.stat(dst, function(err, info){
    if (!err) return console.log('The project directory cannot be created: the file already exists');

    wrench.copyDirRecursive(boilerplateSrc, dst, function(err){
      if (err) return console.log('Error while generating project contents');

      fs.createReadStream(path.join(dst, 'src', 'index.html.example')).pipe(
          fs.createWriteStream(path.join(dst, 'src', 'index.html')));
      fs.createReadStream(path.join(dst, 'src', 'config.js.example')).pipe(
          fs.createWriteStream(path.join(dst, 'src', 'config.js')));

      fs.rename(path.join(dst, 'gitignore'), path.join(dst, '.gitignore'), function(){});
    });
  });

};