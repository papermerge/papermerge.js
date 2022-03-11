
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

export {
  merge_items
}