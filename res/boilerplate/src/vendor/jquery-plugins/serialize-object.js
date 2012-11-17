
/**
 * jQuery plugin to encode a set of form elements as an object containing
 * field names as keys and field values as values.
 */

(function($){

  'use strict';

  $.fn.serializeObject = function(){
    var result = {},
    serialization = this.serializeArray();
    for (var i=0; i<serialization.length; i++){
      if (serialization[i].name.match(/\[\]$/)){
        var name = serialization[i].name;
        name = name.substr(0, name.length-2);
        if (!result[name] || !(result[name] instanceof Array)){
          result[name] = [];
        }
        result[name].push(serialization[i].value);
      } else {
        result[serialization[i].name] = serialization[i].value;
      }
    }
    return result;
  };

}(window.jQuery));