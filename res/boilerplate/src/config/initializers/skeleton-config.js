
/**
 * Configurator
 */

define([
  'app',
  'config',
  'skeleton/util/log',
  'skeleton/i18n'
], function(app, config, log, I18n){

  'use strict';

  app.on('initialize:before', function(){
    // I18n config
    I18n.setLoadPath(config.i18n.loadPath);
    I18n.setAvailableLocales(config.i18n.availableLocales);
    I18n.setDefaultLocale(config.i18n.locale);
    I18n.setLocale(config.i18n.locale);

    // Log config
    log.setLevel(config.log.level);
  });

});