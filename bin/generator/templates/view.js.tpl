
/**
 * <%= humanName %> view
 */

define([
  'skeleton/view'<% _(deps).each(function(dep){ print(',\n  \'' + dep.path + '\''); }); %>
], function(View<% _(deps).each(function(dep){ print(', ' + dep.argument); }); %>){
  
  var <%= className %> = View.extend({

    <% if (usingTemplate){ %>template: template
    <% } else { %>// Add your view attributes, template, initialization, etc. here
    <% } %>
  });
  
  return <%= className %>;

});