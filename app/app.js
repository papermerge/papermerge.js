import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'papermerge/config/environment';
import '@popperjs/core';
import bootstrap from 'bootstrap';


export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  ready() {
    /*
      Hide rotating spinner when application finished loading and it is ready

      Initial index.html has as background a rotating spinner which
      indicates that application is loading:

      <div class="loading">
        <div class="loader"></div>
      </div>
    */
    let divs = document.getElementsByClassName('loading');

    if (divs.length > 0) {
      divs[0].style.display = 'None';
    }

    /*Initializer bootstrap toasts*/
    let toastElList = [].slice.call(document.querySelectorAll('.toast'))
    toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl)
    })

  }
}

loadInitializers(App, config.modulePrefix);
