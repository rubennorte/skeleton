
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

function deleteRecursive(err, files){
  if (err) return;
  files.forEach(function(file){
    fs.stat(file, function(err, stat){
      if (err) return;

      if (stat.isDirectory()){
        wrench.rmdirRecursive(file, function(){});
      } else {
        fs.unlink(file, function(){});
      }
    });
  });
}

exports.create = function(dst){
  
  fs.stat(dst, function(err, info){
    if (!err) return console.log('The project directory cannot be created: the file already exists');
    var boilerplateSrc = path.join(__dirname, '..', '..', 'src');
    wrench.copyDirRecursive(boilerplateSrc, dst, function(err){
      if (err) return console.log('Error while generating project contents');

      glob(dst + '/**/.git', deleteRecursive);
      glob(dst + '/**/.gitmodules', deleteRecursive);
    });
  });

};