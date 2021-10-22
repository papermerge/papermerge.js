import Base from 'ember-simple-auth/authenticators/base';


class AuthToken extends Base {

  async authenticate(username, password) {
    let response, error;

    response = await fetch('http://localhost:8000/api/auth-token/', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    });

    if (response.ok) {
      return response.json();
    } else {
      error = await response.json();
      throw new Error(error.non_field_errors[0]);
    }
  }

  restore(data) {
    //pass
  }

  invalidate(data) {
    //pass
  }
}


export default AuthToken;