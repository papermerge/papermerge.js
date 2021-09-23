import EmberRouter from '@ember/routing/router';
import config from 'papermerge/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('documents');
  this.route('about');
  this.route('contact', { path: '/getting-in-touch' });
  this.route('document', { path: '/document/:document_id' });
  this.route('folder', { path: '/folder/:folder_id' });
});
