
export default class RWDataTransfer {

  constructor({ro_data_transfer, format}) {
    this._ro_data_transfer = ro_data_transfer;
    this._format = format || "application/x.page";
  }

  set(key, value) {
    this._ro_data_transfer.setData(
      `${this.format}/${key}/${value}`,
      value
    );
  }

  get(key) {
    let prefix = `${this.format}/${key}/`,
      result = undefined,
      prefix_len;

    prefix_len = prefix.length;

    this._ro_data_transfer.types.forEach((type) => {

      if (type.startsWith(prefix)) {
        result = type.substring(prefix_len);
        return;
      }
    });

    return result;
  }

  get format() {
    return this._format;
  }
}
