import { ws_base_url } from 'papermerge/utils/host';
import Service from '@ember/service';
import { service } from '@ember/service';


export default class WSBaseService extends Service {

  @service notify;
  @service session;

  constructor(owner, args) {
    super(owner, args);

    let that = this, message, token;

    if (this.session.isAuthenticated) {
      token = this.session.data.authenticated.token;
    } else {
      console.log("WSBaseService - not authenticated");
      return;
    }

    // WebSocket function does not accept header parameters i.e. there
    // is no direct way of passing HTTP Header.
    // One way of passing auth token (so that websocket server will
    // be able to authenticate)
    // is via second param of WebSocket contructor (so called sub-protocols).
    // All values passed (as array) in second parameter to WebSocket
    // constructor end up as value for `Sec-WebSocket-Protocol` header.
    // In this specific case:
    // Sec-WebSocket-Protocol: access_token, <token>
    this._socket = new WebSocket(
      `${ws_base_url()}${this.url()}`, ['access_token', token]
    );

    this._handlers = [];

    this._socket.onerror = function(event) {
      console.info(`Error while connecting to WebSocket event=${event}`);
    }

    this._socket.onmessage = function(event) {
      that._handlers.forEach((item) => {
        let json_data;

        try {
          json_data = JSON.parse(event.data);
          item.handler.apply(item.context, [json_data, event]);
        } catch (err) {
          message = `Error ${err} while parsing incoming data: ${event.data}`;
          that.notify.error(message);
          console.log(message);
        }
      });
    }
  }

  addHandler(handler, context) {
    if (!this._socket) {
      return;
    }
    this._handlers.push({handler, context});
  }

}
