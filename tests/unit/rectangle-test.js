import { module, test } from 'qunit';
import Rectangle from 'papermerge/utils/rectangle';
import Point from 'papermerge/utils/point';


module('Unit | Rectangle', function () {
  test('basic rectangle creation', function (assert) {
    let rect = new Rectangle(1, 1, 200, 200);

    assert.ok(rect);
  });

  test('p1, p2, p3, p4', function(assert) {
    let rect;

    rect = new Rectangle(100, 200, 10, 5);

    assert.true(
      rect.p1.isEqual(new Point(100, 200))
    );

    assert.true(
      rect.p2.isEqual(new Point(110, 200))
    );

    assert.true(
      rect.p3.isEqual(new Point(110, 205))
    );

    assert.true(
      rect.p4.isEqual(new Point(100, 205))
    );
  });

  test('instersect positive 1', function(assert) {
    let rect1, rect2;

    rect1 = new Rectangle(100, 100, 20, 20);
    rect2 = new Rectangle(110, 90, 5, 25);

    assert.true(
      rect1.intersect(rect2)
    );

    assert.true(
      rect2.intersect(rect1)
    );
  });

  test('instersect positive 2', function(assert) {
    let rect1, rect2;

    rect1 = new Rectangle(100, 100, 20, 20);
    rect2 = new Rectangle(110, 90, 5, 300);

    assert.true(
      rect1.intersect(rect2)
    );

    assert.true(
      rect2.intersect(rect1)
    );
  });

  test('instersect negative', function(assert) {
    let rect1, rect2;

    rect1 = new Rectangle(100, 100, 20, 20);
    rect2 = new Rectangle(10, 10, 15, 15);

    assert.false(
      rect1.intersect(rect2)
    );

    assert.false(
      rect2.intersect(rect1)
    );
  });
});

