import Base from 'ember-simple-auth/authenticators/base';
import { base_url } from 'papermerge/utils/host';


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

    response = await fetch(`${base_url()}/auth/login/`, {
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

}
