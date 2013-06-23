/*global require:true*/
/*jshint strict:false*/

/**
 * RequireJS configuration
 */

// If requirejs is not already defined,
// define it as the config we want to apply
if (typeof require === 'undefined'){
  require = {
    config: function(r){
      require = r;
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
    "text":   "components/requirejs-text/text",
    "tpl":    "components/requirejs-tpl/tpl",
    "json":   "components/requirejs-plugins/src/json",
    "async":  "components/requirejs-plugins/src/async",

    // Add other RequireJS plugins here

    // Vendor libraries
    "jquery": "components/jquery/jquery",
    "underscore": "components/underscore/underscore",
    "underscore.string": "components/underscore.string/lib/underscore.string",
    "backbone": "components/backbone/backbone",
    "q": "components/q/q",
    "jquery-serialize-object": "components/jquery-serialize-object/jquery-serialize-object",
    "moment": "components/moment/moment"

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
      location: "components/skeleton-lib"
    }
  ],

  map: {
    '*': {
      'dom': 'jquery'
    }
  }

});