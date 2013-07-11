/*global require:true*/
/*jshint strict:false*/

/**
 * RequireJS configuration
 */

// If requirejs is not already defined,
// define it with the config function we want to use
if (typeof require === 'undefined'){
  require = {
    config: function(configuration){
      // Assign the configuration to the global require variable
      require = configuration;
    }
  };
}

require.config({

  baseUrl: "./",

  paths: {
    // App directories
    "collections": "app/collections",
    "libs": "app/libs",
    "models": "app/models",
    "routers": "app/routers",
    "views": "app/views",

    // Resource directories (only those loaded as modules)
    "data": "assets/data",
    "locales": "assets/locales",
    "stylesheets": "assets/stylesheets",
    "templates": "assets/templates",

    // RequireJS plugins
    "text":   "bower_components/requirejs-text/text",
    "tpl":    "bower_components/requirejs-tpl/tpl",
    "json":   "bower_components/requirejs-plugins/src/json",
    "async":  "bower_components/requirejs-plugins/src/async",

    // Add other RequireJS plugins here

    // Vendor libraries
    "jquery": "bower_components/jquery/jquery",
    "underscore": "bower_components/underscore/underscore",
    "underscore.string": "bower_components/underscore.string/lib/underscore.string",
    "backbone": "bower_components/backbone/backbone",
    "q": "bower_components/q/q",
    "jquery-serialize-object": "bower_components/jquery-serialize-object/jquery-serialize-object",
    "moment": "bower_components/moment/moment"

    // Add other vendor libraries alias here
  },

  shim: {
    "underscore": {
      exports: "_"
    },

    "underscore.string": {
      deps: ["underscore"],
      init: function(_){
        return _.string;
      }
    },

    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    // jQuery plugins
    "jquery-serialize-object": {
      deps: ["jquery"],
      exports: "jQuery"
    }

    // Add other jquery plugins here (which aren't defined as AMD modules)
  },

  packages: [
    {
      name: "skeleton",
      location: "bower_components/skeleton-lib"
    }
  ],

  map: {
    '*': {
      'dom': 'jquery'
    }
  }

});