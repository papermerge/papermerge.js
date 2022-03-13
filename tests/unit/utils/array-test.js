import { module, test } from 'qunit';
import {
  get_id,
  extract_selected_ids,
  reposition_items
} from 'papermerge/utils/array';


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

  test('extract_selected_ids 1', function(assert) {
    let items,
      selected_ids = ['2'],
      expected_selected_items,
      expected_remaining_items;

    items = [
      new Page('1'), new Page('2'), new Page('3'), new Page('4')
    ];

    expected_selected_items = [
      new Page('2')
    ]

    expected_remaining_items = [
      new Page('1'), new Page('3'), new Page('4')
    ]

    let {selected_items, remaining_items} = extract_selected_ids({
      items, selected_ids
    });

    assert.expect(
      expected_selected_items.length + expected_remaining_items.length
    );

    expected_selected_items.forEach((page, index) => {
      assert.strictEqual(page.id, selected_items[index].id);
    });

    expected_remaining_items.forEach((page, index) => {
      assert.strictEqual(page.id, remaining_items[index].id);
    });
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

  test('reposition_items 2', function(assert) {
    let items,
      selected_ids = ['2', '3'],
      drop_pos = 0,
      actual_result,
      expected_result;

    items = [
      new Page('1'), new Page('2'), new Page('3'), new Page('4')
    ];

    expected_result = [
      new Page('2'), new Page('3'), new Page('1'), new Page('4')
    ]

    actual_result = reposition_items({
      items, selected_ids, drop_pos
    });

    assert.expect( expected_result.length );

    expected_result.forEach((page, index) => {
      assert.strictEqual(page.id, actual_result[index].id);
    });
  });

  test('reposition_items 3', function(assert) {
    let items,
      selected_ids = ['1'],
      drop_pos = 3,
      actual_result,
      expected_result;

    items = [
      new Page('1'), new Page('2'), new Page('3'), new Page('4')
    ];

    expected_result = [
      new Page('2'), new Page('3'), new Page('4'), new Page('1')
    ]

    actual_result = reposition_items({
      items, selected_ids, drop_pos
    });

    assert.expect( expected_result.length );

    expected_result.forEach((page, index) => {
      assert.strictEqual(page.id, actual_result[index].id);
    });
  });

  test('reposition_items 4', function(assert) {
    let items,
      selected_ids = ['2', '3'],
      drop_pos = 3,
      actual_result,
      expected_result;

    items = [
      new Page('1'), new Page('2'), new Page('3'), new Page('4')
    ];

    expected_result = [
      new Page('1'), new Page('4'), new Page('2'), new Page('3')
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
