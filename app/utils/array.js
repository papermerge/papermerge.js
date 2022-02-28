function merge_nodes(node_id, nodes) {
  /*
  Returns a list of {id: <node.id>} objects with no duplicates.
  List contains as node_id given as first parameter as well as all nodes
  given as second parameter.
  */
  let source_nodes;

  if (!nodes) {
    return [{id: node_id}];
  }

  if (!nodes.length) {
    return [{id: node_id}];
  }

  source_nodes = nodes.map(item => {
    return {'id': item.get('id')};
  });

  // if by concatinating nodes with node_id there
  // will be no duplicates:
  if (!source_nodes.find(item => item.id == node_id)) {
    return [{id: node_id}].concat(source_nodes)
  }

  return source_nodes;
}

export {
  merge_nodes
}