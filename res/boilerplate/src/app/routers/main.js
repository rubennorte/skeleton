
/**
 *  Main app router
 */

define([
  'skeleton/router'
], function(Router){

  'use strict';

  var MainRouter = Router.extend({

    routes: {
      // Add your routes here
      '*defaultRoute': 'defaultRoute'
    },

    defaultRoute: function(route){
      console.warn('No route:', route);
    }

  });

  return new MainRouter();
  
});