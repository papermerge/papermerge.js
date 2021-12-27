import { ws_base_url } from 'papermerge/utils';
import Service from '@ember/service';


export default class WSNodesMove extends Service {


  constructor(owner, args) {
    super(owner, args);

    let that = this;

    this._socket = new WebSocket(`${ws_base_url()}/nodes/move`);
    this._handlers = [];

    this._socket.onmessage = function(event) {
      that._handlers.forEach((item) => {
        let json_data;

        try {
          json_data = JSON.parse(event.data);
          item.handler.apply(item.context, [json_data, event]);
        } catch (err) {
          console.log(`Error ${err} while parsing incoming data: ${event.data}`);
        }
      });
    }
  }

  addHandler(handler, context) {
    this._handlers.push({handler, context});
  }
}