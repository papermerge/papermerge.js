import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { TrackedArray } from 'tracked-built-ins';


export default class Notify extends Service {
  /*
    Push notifications to your visitors with a toast, a lightweight and easily customizable alert message.
  */
  @tracked notifications = new TrackedArray([]);

  info(message) {
    let type = 'info';

    this.notifications.push({message, type});
  }

  warning(message) {
    let type = 'warning';

    this.notifications.push({message, type});
  }

  error(message) {
    let type = 'error';

    this.notifications.push({message, type});
  }
}
