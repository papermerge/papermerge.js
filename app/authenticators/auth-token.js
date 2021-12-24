import ENV from 'papermerge/config/environment';
import Base from 'ember-simple-auth/authenticators/base';


export default class AuthToken extends Base {
  /*
  Simple token based authenticator

  Sends to the server username and password. If credentials are valid, servers
  sends back a token. Token string returned from the server is then passed
  back and forth between client and server via `Token` header.
  */

  async restore(data) {
    /**
     * Restores session token from the cookie.
     */
    let { token } = data;

    if (token) {
      return data;
    } else {
      throw 'no valid session data';
    }
  }

  async authenticate(username, password) {
    let response, error;

    response = await fetch(`${this.base_url}/auth-token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return response.json();
    } else {
      error = await response.json();
      throw new Error(error.non_field_errors[0]);
    }
  }

  get base_url() {
    if (!ENV.APP.HOST) {
      return `${window.location.origin}/${ENV.APP.NAMESPACE}`;
    }

    return `${ENV.APP.HOST}/${ENV.APP.NAMESPACE}`;
  }
}
