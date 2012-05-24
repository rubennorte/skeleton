
/*!
 * Skeleton.js - Log
 * Copyright(c) 2012 Rubén Norte <rubennorte@gmail.com>
 * MIT Licensed
 */

define([
  './text'
], function(Utils){

  // The "window" object
  var root = this;

  // If console is undefined, define one with all functions as noop (IE hack)
  if (!root.console){
    root.console = {
      setLevel: noop,
      isLoggable: noop,
      log: noop,
      trace: noop,
      debug: noop,
      info: noop,
      warn: noop,
      error: noop
    };

    return root.console;
  }

  // Reference to the original console object
  var console = root.console;

  // Log levels
  var LOG_LEVELS = {
    TRACE:  0,
    DEBUG:  1,
    INFO:   2,
    WARN:   3,
    ERROR:  4,
    LOG:    5,  // Force log
    SILENT: 6   // No log message is printed at this level
  };

  // Which methods correspond this log methods to
  var METHOD_MAPPING = ['debug', 'debug', 'info', 'warn', 'error', 'log'],
      LOG_TAGS = ['T', 'D', 'I', 'W', 'E', 'L'];

  var logLevel = LOG_LEVELS.ERROR;

  /**
   * Console redefinition
   */
  root.console = {

    // Original console
    _orig: console,
   
    /**
     * Returns the date that will be printed on the log
     */
    formatDate: function(date){
      return Utils.sprintf('%02d/%02d/%02d - %02d:%02d:%02d',
        date.getDate(), date.getMonth()+1, parseInt((''+date.getFullYear()).substr(2)),
        date.getHours(), date.getMinutes(), date.getSeconds());
    },

    /**
     * Change the current log level
     */
    setLevel: function(level){
      logLevel = level;
    },

    /**
     * Determines if a log message with the specified level would be printed
     */
    isLoggable: function(level){
      return logLevel <= level;
    },

    /**
     * Logs the message unless the log is silenced
     */
    log: function(){
      return this._doLog(this.LOG, arguments);
    },

    trace: function(){
      return this._doLog(this.TRACE, arguments);
    },
    
    debug: function(){
      return this._doLog(this.DEBUG, arguments);
    },
    
    info: function(){
      return this._doLog(LOG_LEVELS.INFO, arguments);
    },
    
    warn: function(){
      return this._doLog(LOG_LEVELS.WARN, arguments);
    },
    
    error: function(){
      return this._doLog(LOG_LEVELS.ERROR, arguments);
    },

    _doLog: function(level, args){
      if (logLevel <= level){
        var method = METHOD_MAPPING[level];

        if (typeof(args[0]) == 'string'){
          args[0] = Utils.sprintf('%s | %s | %s',
          this.formatDate(new Date()),
          LOG_TAGS[level],
          args[0]);
        }

        return console[method].apply(console, args);
      }
      return false;
    }

  };

  // Save log levels in console object
  for (var level in LOG_LEVELS)
    root.console[level] = LOG_LEVELS[level];

  return root.console;

});
