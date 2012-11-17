{
  appDir: 'src',
  
  baseUrl: './',

  dir: 'dist/optimized',
    
  // Remove this if you don't include all your templates in the built file.
  pragmasOnSave: {
    excludeTpl: true
  },

  optimize: 'uglify',

  inlineText: true,

  preserveLicenseComments: true,

  findNestedDependencies: true,

  removeCombined: true,

  name: "config/boot",

  mainConfigFile: 'src/config/boot.js'
}