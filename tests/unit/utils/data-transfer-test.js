import { module, test } from 'qunit';
import RWDataTransfer from 'papermerge/utils/rw_data_transfer';


class FakeRoDataTransfer {
  constructor(_types) {
    this._types = _types || [];
  }

  setData(key, value) {
    this._types.push(key);
  }

  get types() {
    return this._types;
  }
}


module('Unit | Utils | RWDataTransfer', function () {
  test('instanciation RWDataTransfer', function (assert) {
    let rw_data;

    rw_data = new RWDataTransfer({
      ro_data_transfer: new FakeRoDataTransfer(),
      format: "some format"
    });

    assert.ok(rw_data);
  });

  test('Retrieve data from RWDataTransfer', function (assert) {
    let rw_data;

    rw_data = new RWDataTransfer({
      ro_data_transfer: new FakeRoDataTransfer(),
      format: "application/x.page"
    });

    rw_data.set("source_doc_id", "123");

    assert.true(
      rw_data.get("source_doc_id") === "123"
    );
  });


  test('Retrieve data from RWDataTransfer 2', function (assert) {
    let rw_data, ro_data;

    ro_data = new FakeRoDataTransfer();
    ro_data.setData('application/x.page/some_data/xyz', 'xyz');

    rw_data = new RWDataTransfer({
      ro_data_transfer: ro_data,
      format: "application/x.page"
    });

    assert.true(
      rw_data.get("some_data") === "xyz"
    );
  });

});
