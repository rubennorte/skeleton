
/*!
 * Skeleton.js - DefaultHelpers
 * Copyright(c) 2012 Rubén Norte <rubennorte@gmail.com>
 * MIT Licensed
 */

define([
  'config',
  'underscore',
  // Used through underscore reference
  'underscore.string',
  '../i18n',
  '../util/url'
], function(config, _, _s, I18n, url){

  'use strict';

  return {

    // Config object
    config: config,

    // Underscore reference (it's passed to the underscore templates by the
    // engine itself, but we can't assume that we're using the underscore
    // template engine)
    _: _,

    // I18n and its main functions
    I18n: I18n,
    t: I18n.t,
    
    /**
     * Returns the backend url for the specified path
     */
    backendUrl: function(path){
      return url.join(_.result(config.url, 'backend'), path);
    },

    /**
     * Returns the url of the specified path relative to the app root url
     */
    urlTo: function(dst){
      return url.join(_.result(config.url, 'root'), dst);
    },

    /**
     * Returns the url of the specified path relative to the assets url
     */
    assetUrl: function(src){
      return url.join(_.result(config.url, 'assets'), src);
    },

    /**
     * Returns the url of the specified path relative to the images url
     */
    imageUrl: function(src){
      return url.join(_.result(config.url, 'images'), src);
    },

    /**
     * Returns the url of the specified path relative to the stylesheets url
     */
    stylesheetUrl: function(src){
      return url.join(_.result(config.url, 'stylesheets'), src);
    }
  };
});