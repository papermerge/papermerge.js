'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'scss',
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    }
  });

  app.import('node_modules/bootstrap-icons/font/bootstrap-icons.css');
  // There is a type in fontawesome NPM's namespace.
  // It is '@fortawesome' instead of '@fontawesome'!
  app.import('node_modules/@fortawesome/fontawesome-free/css/all.css');
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
