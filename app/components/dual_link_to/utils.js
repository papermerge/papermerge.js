

export function route_name({node, hint, extranode, extradoc}) {

  if (hint == 'left') {
    if (node && node.get('nodeType') === 'document') {
      return 'authenticated.document';
    }

    if (node && node.get('nodeType') === 'folder') {
      return 'authenticated.nodes';
    }
  }

  // hint == 'right'
  if (extranode) {
    return 'authenticated.nodes';
  }

  if (extradoc) {
    return 'authenticated.document';
  }

  return 'authenticated.nodes';
}

export function model_obj({node, hint, extradoc, extranode}) {
  if (hint === 'left') {
    return node;
  }

  // hint right
  if (extradoc) {
    return extradoc;
  }

  return extranode;
}

export function query_dict({node, hint, extranode, extradoc, query}) {
  let result = {};

  if (query) {
    result = Object.assign(result, query);
  }

  if ((hint === 'left') && extranode) {
    return {
      'extra_id': extranode.get('id'),
      'extra_type': 'folder'
    };
  }

  if ((hint === 'left') && extradoc) {
    return {
      'extra_id': extradoc.get('id'),
      'extra_type': 'doc'
    };
  }

  if (hint === 'right' && node) {
    if (node.get('nodeType') === 'document') {
      return {
        'extra_id': node.get('id'),
        'extra_type': 'doc'
      }
    } else if (node.get('nodeType') === 'folder' ) {
      return {
        'extra_id': node.get('id'),
        'extra_type': 'folder'
      }
    }
  }

    return result;
} // end of query