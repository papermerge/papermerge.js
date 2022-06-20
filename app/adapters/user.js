import ApplicationAdapter from './application';
import { service } from '@ember/service';


export default class UserAdapter extends ApplicationAdapter {

  @service store;


  urlForQueryRecord(query) {
    /**
     * this.store.queryRecord('user', { me: true }) will
     * query /api/users/me/ endpoint
     * */
    let originalUrl = super.urlForQueryRecord(...arguments);

    if (query.me) {
      delete query.me;
      return `${originalUrl}/me`;
    }

    return originalUrl;
  }

  async getCurrentUser() {
    let record, me_id;

    me_id = window.localStorage.getItem('me');
    if (me_id) {
      record = this.store.peekRecord('user', me_id);

      if (record) {
        return record;
      }
    }
    record = await this.store.queryRecord(
        'user', { me: true }
    );

    window.localStorage.setItem('me', record.id);

    return record;
  }
}
