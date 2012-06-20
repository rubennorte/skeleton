#!/usr/bin/env node

/**
 * Module dependencies
 */

var program = require('commander'),
    project = require('./project');

/**
 * Module definitions
 */

program
  .version('0.0.1')
  .usage('[command] <args>');

program
  .command('new <project>')
  .description('create a new skeleton project')
  .action(project.create)
  .on('--help', function() {
    console.log('  Example:');
    console.log();
    console.log('    $ skeleton new my-project');
    console.log();
  });

program
  .command('*')
  .action(function(){
    console.log(program.helpInformation());
  });

program.parse(process.argv);

if (!program.args.length) console.log(program.helpInformation());