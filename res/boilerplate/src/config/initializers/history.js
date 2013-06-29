
/**
 * History starter
 */

define([
  'app',
  'skeleton/history',
  'gen/routers'
], function(app, history){

  'use strict';

  app.on('initialize:after', function(){
    // Start routing when all routers have been loaded
    history.start();
  });

});