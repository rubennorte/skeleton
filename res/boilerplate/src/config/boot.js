
/**
 * RequireJS configuration
 */

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
    "backbone": "vendor/backbone"

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
      init: function($){
        return $;
      }
    }

    // Add other jquery plugins here (which aren't defined as AMD modules)
  },

  packages: [
    {
      name: "skeleton",
      location: "vendor/skeleton"
    }
  ]

});

/**
 * Application boot
 */

require([
  'app',
  'config/deps/initializers'
], function(app){
  app.initialize();
});