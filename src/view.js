
/**
 * Module dependencies
 */

var fs = require('fs'),
    u = require('underscore'),
    _s = require('underscore.string'),
    templateGenerator = require('./template');

/**
 * Module exports
 */

function getModuleFileName(path){
  var res = u(path.split('!')).last();
  res = u(res.split('/')).last();
  res = u(res.split('.')).first();
  return res;
}

exports.create = function(name, options){

  // Determine dependency arguments
  var deps = u(options.dependencies).map(function(dep){
    var arg;
    switch (dep){
      case 'jquery': arg = '$'; break;
      case 'underscore': arg = '_'; break;
      default:
        var humanFileName = _s.humanize(getModuleFileName(dep));
        if (/tpl!templates\/.+/.test(dep))
          arg = _s.camelize(humanFileName) + 'Template';
        else if (/models\/.+/.test(dep))
          arg = _s.classify(humanFileName) + 'Model';
        else if (/collections\/.+/.test(dep))
          arg = _s.classify(humanFileName) + 'Collection';
        else if (/views\/.+/.test(dep))
          arg = _s.classify(humanFileName) + 'View';
        else if (/routers\/.+/.test(dep))
          arg = _s.classify(humanFileName) + 'Router';
        else
          arg = _s.classify(humanFileName);
    }

    return {
      argument: arg,
      path: dep
    };
  });

  var fileName = _s.slugify(_s.humanize(name)),
      path = 'app/views/' + fileName + '.js';

  // Templating
  var templateFileName, templatePath, templateName;
  if (options.template){

    if (typeof(options.template) == 'string')
      templateFileName = options.template;
    else
      templateFileName = fileName;

    templatePath = 'tpl!templates/' + templateFileName + '.html';

    deps.push({
      argument: 'template',
      path: templatePath
    });
  }

  fs.stat('app/views', function(err, stat){
    if (err || !stat.isDirectory()) return console.log('The "views" directory does not exist');

    fs.stat(path, function(err, stat){
      if (!err) return console.log('The file %s already exists', path);

      fs.readFile(__dirname + '/templates/view.js.tpl', function (err, data) {
        if (err) throw err;

        var template = u.template(data.toString());

        var humanName = _s.humanize(name);

        var content = template({
          humanName: humanName,
          className: _s.classify(humanName) + 'View',
          fileName: fileName,
          deps: deps,
          usingTemplate: options.template
        });

        fs.writeFile(path, content, function(err){
          if (err) return console.log('Error writing to file %s', path);

          console.log('+++ %s\tView %s successfully created', path, name);

          if (options.template)
            templateGenerator.create(templateFileName);
        });
      });

    });
  });

};