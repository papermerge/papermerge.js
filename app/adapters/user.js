import ApplicationAdapter from './application';


export default class UserAdapter extends ApplicationAdapter {

  _defaultContentType = 'application/json';

  changePassword(model, new_password) {
    const url = this.buildURL('user', model.id) + 'change-password/';

    return this.ajax(url, 'POST',  {
      data: {
        'password': new_password
      }
    });
  }

}