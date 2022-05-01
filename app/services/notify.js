import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { TrackedArray } from 'tracked-built-ins';
import randrange from 'papermerge/utils/random';


export default class Notify extends Service {
  /*
    Lightweight notifications service.

    Usage:

      @service notify;

      some_function() {
        ...
        this.info('New page order successfully applied');
        ...
      }

    The snipped above will display in upper right corner notification message.
    Notification messages can be manually closed. Alternatively notification
    messages will 'disappear' themselves after ``this.NOTIFICATION_TIMEOUT``
    milliseconds.
  */

  NOTIFICATION_TIMEOUT = 9000  // milliseconds
  @tracked notifications = new TrackedArray([]);


  info(message, delay) {
    let type = 'info', id = this._random_id;

    this.add({id, message, type, delay});
  }

  warning(message) {
    let type = 'warning', id = this._random_id, delay;

    delay = 9999000;

    this.add({id, message, type, delay});
  }

  error(message) {
    let type = 'error', id = this._random_id, delay;

    delay = 9999000

    this.add({id, message, type, delay});
  }

  add({id, message, type, delay}) {
    /*
      Adds notification message to the list.

      Notification message will be removed automatically
      from the list after ``this.NOTIFICATION_TIMEOUT`` milliseconds
    */
    if (!delay) {
      delay = this.NOTIFICATION_TIMEOUT;
    }
    this.notifications.push({id, message, type});
    this.delayed_remove_by({id: id, delay});
  }

  remove_by(id) {
    /*
    Removes notification with given ID from ``this.notifications`` array
    */
    let index;

    index = this.notifications.findIndex(item => item.id === id);
    if (index >= 0) {
      this.notifications.splice(index, 1);
    }
  }

  delayed_remove_by({id, delay}) {
    /*
      Remove notification (with ID) from list after ``delay`` milliseconds
    */
    setTimeout(() => {
      this.remove_by(id);
    }, delay);
  }

  get _random_id() {
    /*
      Returns random integer number/ID between 1 and 99999
    */
    return randrange(1, 99999);
  }
}
