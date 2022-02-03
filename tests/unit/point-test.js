import { module, test } from 'qunit';
import Point from 'papermerge/utils/point';


module('Unit | Point', function () {
  test('basic equality positive', function (assert) {
    let p1 = new Point(1, 1), p2 = new Point(1, 1);

    assert.true(
      p1.isEqual(p2)
    );
  });

  test('basic equality negative', function (assert) {
    let p1 = new Point(1, 1), p2 = new Point(1, 2);

    assert.false(
      p1.isEqual(p2)
    );
  });
});

