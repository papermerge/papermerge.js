import { TrackedMap } from 'tracked-built-ins';


const storage = new TrackedMap();


export default function decorator(...args) {
  /*
    Decorator for saving value of class property to local storage.

    Learn more about Local Storage:
      https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

    Decorated class property will be tracked i.e. whenever their value
    changes Ember will trigger rendering of components which make use
    of that variable;

    Example:

      import localStorage from 'papermerge/utils/localStorage';

      class SomeComponent {
        @localStorage expanded_sidebar = false;

        @action
        onSidebarToggle() {
          // this will trigger rerandering of component
          this.expanded_sidebar = !this.expanded_sidebar;
        }
      }
  */

  function wrapper(target, key) {
    initStorage(key);
    return {
      get() {
        return storage.get(key);
      },
      set(value) {
        let json = JSON.stringify(value)

        storage.set(key, value);
        window.localStorage.setItem(key, json);
      }
    }
  }

  return wrapper(...args);
}

function initStorage(key) {
  let value;

  value = JSON.parse(window.localStorage.getItem(key));
  storage.set(key, value);
}
