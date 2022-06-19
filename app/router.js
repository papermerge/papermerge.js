import EmberRouter from '@ember/routing/router';
import config from 'papermerge/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('authenticated', { path: '' }, function () {

    // list search results (sort of mini commander)
    this.route('search');

    this.route('documents');
    this.route('document', { path: '/document/:document_id' });

    this.route('nodes', { path: '/nodes/:node_id' });

    this.route('tags');

    this.route('tokens');

    this.route('automates', function () {
      this.route('add');
      this.route('edit', { path: '/:automate_id/edit' });
      this.route('index', { path: '/' });
    });

    this.route('users', function () {
      this.route('add');
      this.route('edit', { path: '/:user_id/edit' });
      this.route('change_password', { path: '/:user_id/change-password' });
      this.route('index', { path: '/' });
    });

    this.route('groups', function () {
      this.route('add');
      this.route('edit', { path: '/:group_id/edit' });
      this.route('index', { path: '/' });
    });

    this.route('preferences', function() {
      this.route('index', { path: '/' });
      this.route('section', { path: '/:section_name' });
    });


  });

  this.route('login');
  this.route('not-found', { path: '/*path' });
});
