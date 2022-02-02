import { module, test } from 'qunit';
import Point from 'papermerge/utils/point';


module('Unit | Point', function () {
  test('basic', function (assert) {
    let p1 = new Point(1, 1), p2 = new Point(1, 1);

    assert.true(p1.x === p2.x, 'X are not equal');
    assert.true(p1.y === p2.y, 'Y are not equal');
    assert.true(
      p1.isEqual(p2)
    );
  });
});

