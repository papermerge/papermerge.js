import { module, test } from 'qunit';
import { get_id, reposition_items } from 'papermerge/utils/array';


class Page {
  constructor(page_id) {
    this.id = page_id;

  }
  get() {
    return this.id;
  }

  toString() {
    return `Page(${this.id})`;
  }
}

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

  test('reposition_items 1', function(assert) {
    let items,
      selected_ids = ['2'],
      drop_pos = 0,
      actual_result,
      expected_result;

    items = [
      new Page('1'), new Page('2'), new Page('3'), new Page('4')
    ];

    expected_result = [
      new Page('2'), new Page('1'), new Page('3'), new Page('4')
    ]

    actual_result = reposition_items({
      items, selected_ids, drop_pos
    });

    assert.expect( expected_result.length );

    expected_result.forEach((page, index) => {
      assert.strictEqual(page.id, actual_result[index].id);
    });

  });
});

