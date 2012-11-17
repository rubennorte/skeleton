#!/usr/bin/env node

/**
 * Module dependencies
 */

var program = require('commander'),
    project = require('./project'),
    server = require('./server'),
    model = require('./model'),
    collection = require('./collection'),
    view = require('./view'),
    router = require('./router'),
    updateDeps = require('./update-deps'),
    common = require('./common');

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
  .action(common.checkInSkeletonProjectAnd(project.create))
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton new my-project');
    console.log();
  });

program
  .command('server [port=4000]')
  .description('start a web server to serve your skeleton project')
  .action(common.checkInSkeletonProjectAnd(server.run))
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton server 4000');
    console.log();
  });

program
  .command('generate-model <name>')
  .description('generate a new skeleton model')
  .action(common.checkInSkeletonProjectAnd(model.create))
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton generate-model user');
    console.log();
  });

program
  .command('generate-collection <name>')
  .description('generate a new skeleton collection')
  .action(common.checkInSkeletonProjectAnd(collection.create))
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton generate-collection users');
    console.log();
  });

program
  .command('generate-view <name>')
  .description('generate a new skeleton view')
  .action(common.checkInSkeletonProjectAnd(view.create))
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
  .action(common.checkInSkeletonProjectAnd(router.create))
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton generate-router users');
    console.log();
  });

program
  .command('update-deps')
  .description('update the dependencies of a skeleton project')
  .action(common.checkInSkeletonProjectAnd(updateDeps.update))
  .on('--help', function(){
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton update-deps');
    console.log();
  });

program
  .command('*')
  .action(function(){
    console.log(program.helpInformation());
  });

program.parse(process.argv);

if (!program.args.length) console.log(program.helpInformation());