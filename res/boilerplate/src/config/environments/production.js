
/**
 * Configuration for production environment
 */

define(['../application'], function(config){

  'use strict';

  config.env = 'production';

  config.log.level = 'silent';

  // Add your production configuration here

  return config;

});