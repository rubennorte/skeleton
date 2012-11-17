
/**
 * History starter
 */

define([
  'app',
  'skeleton/history'
], function(app, history){

  'use strict';

  app.on('initialize:after', function(){
    // Start routing when all routers have been loaded
    history.start();
  });

});