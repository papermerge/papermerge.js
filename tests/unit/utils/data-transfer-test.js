import { module, test } from 'qunit';
import {
  RWDataTransfer,
  APPLICATION_XPAGE
} from 'papermerge/utils/rw_data_transfer';


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
  test('instantiate basic RWDataTransfer', function (assert) {
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
      format: APPLICATION_XPAGE
    });

    rw_data.set("source_doc_id", "123");

    assert.true(
      rw_data.get("source_doc_id") === "123"
    );
  });


  test('Retrieve data from RWDataTransfer 2', function (assert) {
    let rw_data, ro_data;

    ro_data = new FakeRoDataTransfer();
    ro_data.setData(
      `${APPLICATION_XPAGE}/some_data/xyz-actual-data`,
      'xyz-not-used' // discarded during `drag` event
    );

    rw_data = new RWDataTransfer({
      ro_data_transfer: ro_data,
      format: APPLICATION_XPAGE
    });

    assert.true(
      rw_data.get("some_data") === "xyz-actual-data"
    );
  });

  test('Retrieve data from RWDataTransfer 3', function (assert) {
    let rw_data, ro_data;

    ro_data = new FakeRoDataTransfer();
    ro_data.setData(
      `${APPLICATION_XPAGE}/some_data/xyz-actual-data`,
      'xyz-not-used' // discarded during `drag` event
    );

    rw_data = new RWDataTransfer({
      // use default format, which is "application/x.page"
      ro_data_transfer: ro_data
    });

    assert.true(
      rw_data.get("some_data") === "xyz-actual-data"
    );
  });

});
