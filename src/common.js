
/**
 * Module dependencies
 */

var fs = require('fs'),
    path = require('path'),
    u = require('underscore');

/**
 * Module exports
 */

// Necessary directories in each level
const SKELETON_ROOT = ['src'];
const SKELETON_SRC = ['app', 'config'];

exports.checkInSkeletonProjectAnd = function(fn, errFn){

  return function(){
    var args = arguments;
    fs.readdir('.', function(err, files){
      if (err) throw new Error(err);

      if (u.difference(SKELETON_ROOT, files).length === 0){
        process.chdir('./src');
        fn.apply(null, args);
      } else if (u.difference(SKELETON_SRC, files).length === 0){
        fn.apply(null, args);
      } else {
        console.error('You are not in a skeleton project root or src directory.');
        if (errFn) errFn();
      }
    });
  };
};