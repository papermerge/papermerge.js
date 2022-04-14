import { module, test } from 'qunit';
import {
  get_id,
  extract_selected_ids,
  reposition_items,
  is_permuted
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

    assert.deepEqual(expected_selected_items, selected_items);
    assert.deepEqual(expected_remaining_items, remaining_items);
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

    assert.deepEqual(expected_result, actual_result);
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

    assert.deepEqual(expected_result, actual_result);
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

    assert.deepEqual( expected_result, actual_result);
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

    assert.deepEqual(expected_result, actual_result);
  });

  test('reposition_items corner case for two pages', function(assert) {
    /*
      User reorders pages using drag 'n drop. While he/she drags
      the page a semi-transparent placeholder (drop placeholder) is
      inserted into array of pages - the placeholder has two functions:
        1. Suggests where dropping is possible
        2. It is used as placeholder - selected pages will be inserted into
        the position where placeholder is

      When user drops selected pages will be inserted in
      place of 'drop placeholder'. In case of two pages document,
      if user wants to move first page at the end, the placeholder
      will be inserted in position "2":
       0 = first page, 1 = second page, 2 = placeholder

      This usecase tests exactly this scenario - when drop placeholder
      position = 2.
    */
    let items,
      selected_ids = ['1'],
      drop_pos = 2,
      actual_result,
      expected_result;

    items = [
      new Page('1'), new Page('2')
    ];

    expected_result = [
      new Page('2'), new Page('1')
    ]
    // drag 'n drop first page to the end of document
    actual_result = reposition_items({
      items, selected_ids, drop_pos
    });

    assert.deepEqual(expected_result, actual_result);
  });

  test('is_permuted 1', function(assert) {
      let arr1, arr2;

    arr1 = [
      new Page('1'), new Page('2')
    ];

    arr2 = [
      new Page('2'), new Page('1')
    ]

    assert.true(is_permuted(arr1, arr2));
  });

  test('is_permuted 2', function(assert) {
      let arr1, arr2;

    arr1 = [
      new Page('1'), new Page('2')
    ];

    arr2 = [
      new Page('1'), new Page('2')
    ]
    // no permutations here
    assert.false(is_permuted(arr1, arr2));
  });

  test('is_permuted - invalid input - one of arrays is empty', function(assert) {
      let arr1;

    arr1 = [
      new Page('1'), new Page('2')
    ];

    assert.false(is_permuted(arr1));
    assert.false(is_permuted([], arr1));
    assert.false(is_permuted(undefined, arr1));
  });

  test('is_permuted - drop placeholders are discarded', function(assert) {
      let arr1, arr2;

    arr1 = [
      new Page('1'), new Page('2')
    ];

    arr2 = [
      new Page('1'), new Page('2'), {'is_drop_placeholder': true}
    ];

    // drop placeholders are discard i.e drop placeholders are
    // removed first and only afterwards arrays are compared
    assert.false(is_permuted(arr1, arr2));
  });
}); // 'Unit | Utils | Array'
