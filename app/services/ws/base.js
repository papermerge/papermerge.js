import { ws_base_url } from 'papermerge/utils/host';
import Service from '@ember/service';
import { service } from '@ember/service';


export default class WSBaseService extends Service {

  @service notify;

  constructor(owner, args) {
    super(owner, args);

    let that = this, message;

    this._socket = new WebSocket(`${ws_base_url()}${this.url()}`);
    this._handlers = [];

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
    this._handlers.push({handler, context});
  }

}
