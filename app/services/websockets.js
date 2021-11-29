import ENV from 'papermerge/config/environment';
import Service from '@ember/service';


export default class Websockets extends Service {


  constructor(owner, args) {
    super(owner, args);

    let that = this;

    this._socket = new WebSocket(`${this.base_url}document/`);
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

  get base_url() {
    return `${ENV.APP.WS_HOST}/${ENV.APP.WS_NAMESPACE}/`;
  }

  addHandler(handler, context) {
    this._handlers.push({handler, context});
  }
}