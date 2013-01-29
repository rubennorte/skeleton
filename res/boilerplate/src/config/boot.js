
/**
 * Application boot
 */

require([
  'app',
  'gen/initializers'
], function(app){
  app.initialize();
});