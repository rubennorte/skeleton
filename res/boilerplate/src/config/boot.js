/*global require:true*/
/*jshint strict:false*/

/**
 * Application boot
 */

require([
  'app',
  'gen/initializers'
], function(app){
  app.initialize();
});