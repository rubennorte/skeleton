
/**
 * View boot
 */

define([
  'app',
  'views/main',
  'jquery'
], function(app, MainView, $){

  'use strict';

  app.on('initialize:after', function(){
    // Create main application view
    var mainView = app.mainView = new MainView();

    // Render the app on DOM ready
    $(function(){
      $('body').append(mainView.render().el);
    });
  });

});