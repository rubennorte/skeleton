
/**
 * Configuration for staging environment
 */

define(['../application'], function(config){

  'use strict';

  config.env = 'staging';

  config.log.level = 'warn';

  // Add your staging configuration here

  return config;

});