import { module, test } from 'qunit';
import { get_id, reposition_items } from 'papermerge/utils/array';


module('Unit | Utils | Array', function () {

  test('get_id 1', function (assert) {
    let item;

    item = {'id': 5};
    assert.strictEqual(get_id(item), 5);
  });

  test('get_id 2', function (assert) {
    let item;

    item = {'id': 5};
    assert.strictEqual(get_id(item), 5);

    item = {
      'get': () => 13
    };

    assert.strictEqual(get_id(item), 13);
  });
});

