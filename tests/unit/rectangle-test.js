import { module, test } from 'qunit';
import Rectangle from 'papermerge/utils/rectangle';


module('Unit | Rectangle', function () {
  test('basic', function (assert) {
    let rect = new Rectangle(1, 1, 200, 200);

    assert.ok(rect);
  });
});

