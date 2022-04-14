
function get_id(item) {
  if (item.id) {
    return item.id;
  }

  return item.get('id');
}


function merge_items(item_id, items) {
  /*
  Returns a list of {id: <item.id>} objects with no duplicates.
  List contains as item_id given as first parameter as well as all items
  given as second parameter.
  */
  let result_items;

  if (!items) {
    return [{id: item_id}];
  }

  if (!items.length) {
    return [{id: item_id}];
  }

  result_items = items.map(item => {
    return {'id': get_id(item)};
  });

  // if by concatinating items with item_id there
  // will be no duplicates:
  if (!result_items.find(item => item.id == item_id)) {
    return [{id: item_id}].concat(result_items)
  }

  return result_items;
}


function extract_selected_ids({items, selected_ids}) {
  /**
   * Extracts from ``items`` all objects whose ID attribute
   * is in ``selected_id`` array.
   *
   * Example:
   *
   * items = [
   *  Page(id=1), Page(id=2), Page(id=3), Page(id=4), Page(id=5)
   * ]
   *
   * selected_ids = [2, 3]
   *
   * let {selected_items, remaining_items} = extract_selected_ids({
   *   items, selected_ids
   * });
   *
   * Now following equalities are true:
   *
   *  selected_items == [Page(id=2), Page(id=3)]
   *  remaining_items == [Page(id=1), Page(id=4), Page(id=5)]
  */
  let selected_items = [],
    remaining_items = Array.from(items);


  selected_ids.forEach(item_id => {
    let idx, extracted_item;

    idx = remaining_items.findIndex(p => get_id(p) == item_id);

    extracted_item = remaining_items.slice(idx, idx + 1);
    remaining_items.splice(idx, 1);
    selected_items.push(...extracted_item);
  });

  return {selected_items, remaining_items};
}


function reposition_items({items, selected_ids, drop_pos}) {
  /**
   * Returns reordered copy of ``items`` with selected items positioned
   * starting with ``drop_pos``.
   *
   * ``items`` is an array of objects which have an ID attribute.
   * ``selected_ids`` is an array of IDs (i.e. an array of strings) of the
   * items which will be moved to different position.
   * ``drop_pos`` is an integer. It is the target position where selected
   * items will move.
   * Items are usually a list of page instances. The only relevant
   * part of page object is its id attribute.
   * Some 'page' objects, like drop placeholder, will not have id attribute.
  */
  let result = [],
    i, j;

  let { selected_items, remaining_items } = extract_selected_ids({
    items, selected_ids
  });

  for (i=0, j=0; i <= items.length;) {
    if (i == drop_pos) {
      result.push(...selected_items);
      i += selected_items.length;
    } else { // i < drop_pos || i > drop_pos
      if ( j < remaining_items.length ) {
        result.push(remaining_items[j]);
        j++;
      }
      i++;
    }
  }

  return result;
}

function is_permuted(array1, array2) {
  /*
  Detects items order changes i.e. permutations.
  Returns true if items (read pages) in array1 have different
  order as items (pages) in array2.

  Items are page objects. Thus, saying 'items have permutations' is
  same as 'page order has changed'.
  Besides page objects any of the array can have a 'drop placeholder',
  which is a 'special page' used as placeholder.
  In order to correctly detect page order changes placeholder
  is removed first.
  */
  let change = false,
    arr1,
    arr2;

  if (!array1 || !array2) {
    return false;
  }

  if (array1.length == 0 || array2.length == 0) {
    return false;
  }

  // remove drop placelholder from both arrays.
  arr1 = array1.filter(item => !item.is_drop_placeholder);
  arr2 = array2.filter(item => !item.is_drop_placeholder);

  if (arr1.length != arr2.length) {
    return false;
  }

  arr1.forEach((item, index) => {
    let id1, id2;

    id1 = get_id(arr2[index]);
    id2 = get_id(item);

    if (id1 != id2) {
      change = true;
    }
  });

  return change;
}

export {
  get_id,
  merge_items,
  extract_selected_ids,
  reposition_items,
  is_permuted
}
