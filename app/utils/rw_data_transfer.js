
const APPLICATION_XPAGE = 'application/x.page'


class RWDataTransfer {
  /*
  DataTransfer accessible during `drag` event.

  In general transfer data is the data shared
  betweed start/drop event. Transfer data
  is set during 'start' event (of the draggin operation)
  and accesed in subsequent dragging related events.

  Unfortunatelly, as of August 2022, transfer data
  is accessible only during `start`` and `drop` events.
  During `drag` event data transfer is not accessible via
  event.dataTranfer.getData(...) as laster function always
  returns empty string!

  See the caveat described on the page:

    https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData


  The workaround is, as described in:

    https://stackoverflow.com/questions/28487352/dragndrop-datatransfer-getdata-empty/65631468#65631468

  To use event.dataTransfer.types itself as data storage - and this is
  exactly what is `RWDataTransfer` is for. Basically it uses
  `types` attribute as data storage.
  */

  constructor({ro_data_transfer, format}) {
    // original event.dataTransfer of whose `type` attribute
    // will be used as data storage
    this._ro_data_transfer = ro_data_transfer;
    // key prefix
    this._format = format || APPLICATION_XPAGE;
  }

  set(key, value) {
    // here standard event.dataTransfer.setData(...) is invoked
    this._ro_data_transfer.setData(
      `${this.format}/${key}/${value}`, // <--- actual data storage!
      value  // this is discarded during `drag` event
    );
  }

  get(key) {
    /*
      `types` attribute is used as data storage.

      Here we cycle though `types`, which is a list of strings,
      and then extract data from the one which matches specific format.
    */
    let prefix = `${this.format}/${key}/`,
      value = undefined,
      prefix_len;

    prefix_len = prefix.length;

    this._ro_data_transfer.types.forEach((type) => {
      if (type.startsWith(prefix)) {
        // data is stored as `{format}/{key}/{value}`
        value = type.substring(prefix_len);
        return; // stop for loop
      }
    });

    return value;
  }

  get format() {
    return this._format;
  }
}


export {
  RWDataTransfer,
  APPLICATION_XPAGE
}