
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
  */
  let result = [],
    i, j;

  let { selected_items, remaining_items } = extract_selected_ids({
    items, selected_ids
  });

  for (i=0, j=0; i < items.length;) {
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

export {
  get_id,
  merge_items,
  extract_selected_ids,
  reposition_items,
}
