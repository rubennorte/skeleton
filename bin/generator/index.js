#!/usr/bin/env node

/**
 * Module dependencies
 */

var program = require('commander'),
    project = require('./project'),
    model = require('./model'),
    collection = require('./collection'),
    view = require('./view'),
    router = require('./router');

/**
 * Module definitions
 */

function list(str){
  return str.split(',');
}

program
  .version('0.0.1')
  .usage('[command] <args>');

program
  .command('new <project>')
  .description('create a new skeleton project')
  .action(project.create)
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton new my-project');
    console.log();
  });

program
  .command('generate-model <name>')
  .description('generate a new skeleton model')
  .action(model.create)
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton generate-model user');
    console.log();
  });

program
  .command('generate-collection <name>')
  .description('generate a new skeleton collection')
  .action(collection.create)
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton generate-collection users');
    console.log();
  });

program
  .command('generate-view <name>')
  .description('generate a new skeleton view')
  .action(view.create)
  .option('-t, --template [templateName]', 'Create and assign a template')
  .option('-d, --dependencies <deps>', 'Dependency list', list)
  .option('-c, --add-class [className]', 'Add class name')
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton generate-view user-profile -t -d jquery,underscore,./custom');
    console.log();
  });

program
  .command('generate-router <name>')
  .description('generate a new skeleton router')
  .action(router.create)
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton generate-router users');
    console.log();
  });

program
  .command('*')
  .action(function(){
    console.log(program.helpInformation());
  });

program.parse(process.argv);

if (!program.args.length) console.log(program.helpInformation());