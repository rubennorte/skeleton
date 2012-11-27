
/*!
 * Skeleton.js - Collection
 * Copyright(c) 2012 Rubén Norte <rubennorte@gmail.com>
 * MIT Licensed
 */

define([
  'backbone',
  'underscore',
  './util/url',
  'config'
], function(Backbone, _, url, config){

  'use strict';

  /**
   * Skeleton collection definition
   */
  var Collection = Backbone.Collection.extend({

    _loaded: false,
    _loading: 0,
    _data: {},

    reset: function(models, options){
      // Otherwise, it may be set to true in fetch function
      if (models && models.length > 0)
        this._loaded = true;

      return Backbone.Collection.prototype.reset.call(this, models, options);
    },

    /**
     * Backbone fetch function, redefined to provide support for reload option
     * and send the content of the _data property if the data option is not set
     */
    fetch: function(options){
      options = options ? _.clone(options) : {};

      // If reload option is set to false and collection is not empty,
      // return immediately
      if (options.reload === false && this.isLoaded()){
        if (options.success) options.success(this);
        // TODO return something that implements the promise interface
        return;
      }

      // Send stored data (for pagination, filtering, etc.)
      if (!options.data && !_(this._data).isEmpty())
        options.data = this._data;

      // Increment loading count (o set to 1)
      this._loading = (this._loading || 0) + 1;

      // Set new success and error callbacks
      options.success = bindSuccess(this, options.success);
      options.error = bindError(this, options.error);

      // Trigger loading event
      this.trigger('loading', this, options);

      // return super.fetch(options);
      return Backbone.Collection.prototype.fetch.call(this, options);
    },

    /**
     * Returns true if the model is being loaded from the server
     */
    isLoading: function(){
      return !!this._loading;
    },

    /**
     * Returns true if the model has ever been loaded from the server
     */
    isLoaded: function(){
      return !!this._loaded;
    }

  }, {

    /**
     * Returns the backend url for the specified path
     */
    backendUrl: function(path){
      return url.join(config.url.backend, path);
    }

  });

  /**
   * Returns a new success function that updates the loading count
   * and the loaded flag.
   */
  function bindSuccess(collection, success){
    return function(){
      collection._loading--;
      collection._loaded = true;
      if (success) success.apply(collection, arguments);
      else collection.trigger('sync', collection);
    };
  }

  /**
   * Returns a new error function that updates the loading count
   */
  function bindError(collection, error){
    return function(){
      collection._loading--;
      if (error) error.apply(collection, arguments);
      else collection.trigger('error', collection);
    };
  }

  return Collection;
  
});