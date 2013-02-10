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
    "text":   "vendor/requirejs-plugins/text",
    "json":   "vendor/requirejs-plugins/json",
    "tpl":    "vendor/requirejs-plugins/tpl",
    "async":  "vendor/requirejs-plugins/async",
    "cs":     "vendor/requirejs-plugins/cs",

    // Add other RequireJS plugins here

    // Vendor libraries
    "jquery": "vendor/jquery",
    "underscore": "vendor/underscore",
    "underscore.string": "vendor/underscore.string",
    "backbone": "vendor/backbone",
    "q": "vendor/q"

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
    "jquery/serialize-object": {
      deps: ["jquery"],
      exports: "jQuery"
    }

    // Add other jquery plugins here (which aren't defined as AMD modules)
  },

  packages: [
    {
      name: "skeleton",
      location: "vendor/skeleton"
    }
  ],

  map: {
    '*': {
      'dom': 'jquery'
    }
  }

});