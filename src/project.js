
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
  
  var boilerplateSrc = path.join(__dirname, '..', '..', 'res', 'boilerplate');
  var libSrc = path.join(__dirname, '..', '..', 'res', 'lib');

  fs.stat(dst, function(err, info){
    if (!err) return console.log('The project directory cannot be created: the file already exists');

    wrench.copyDirRecursive(boilerplateSrc, dst, function(err){
      if (err) return console.log('Error while generating project contents');

      fs.createReadStream(path.join(dst, 'src', 'index.html.example')).pipe(
          fs.createWriteStream(path.join(dst, 'src', 'index.html')));
      fs.createReadStream(path.join(dst, 'src', 'config.js.example')).pipe(
          fs.createWriteStream(path.join(dst, 'src', 'config.js')));

      wrench.copyDirRecursive(libSrc, path.join(dst, 'src', 'vendor', 'skeleton'), function(err){
        if (err) return console.log('Error adding skeleton lib to project');
        fs.unlink(path.join(dst, 'src', 'vendor', 'skeleton', '.git'));
      });
    });
  });

};