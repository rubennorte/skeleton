
/**
 * Configurator
 */

define([
  'app',
  'config',
  'skeleton/util/log'
], function(app, config, log){

  'use strict';

  app.on('initialize:before', function(){
    // Define application log level
    log.setLevel(config.log.level);
  });

});