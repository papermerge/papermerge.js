import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
  changePassword(model, new_password) {
    const url = this.buildURL('user', model.id) + 'change-password/';

    return this.ajax(url, 'POST', {
      data: {
        password: new_password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

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
}
