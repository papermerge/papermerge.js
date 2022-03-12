
function get_pos_within_siblings(element) {
  /*
  Input element is an HTMLElement instance.
  Returns position order (0, 1, 2, ...) of the ``element``
  within his siblings. Position order starts with zero.

  Example:
  <div>
    <div class='sib'></div> <- pos 0
    <div class='sib'></div> <- pos 1
    <div id="x" class='sib'></div> <-- element
    <div class='sib'></div>
  </div>

  For element with ID='x' as input, will return position 2.

  On error returns -1.
  */
  let el, pos = 0;

  if (!element) {
    return -1;
  }

  if (element.previousElementSibling) {
    el = element.previousElementSibling;
    pos += 1;
  } else {
    // element has no previous siblings i.e. it is
    // very first one.
    return 0;
  }

  do {
    el = el.previousElementSibling;
    if (el) {
      pos += 1;
    }
  } while( el );

  return pos;
}


function get_cursor_pos_within_element(element, cursor_coord) {
  /**
   */
  let rect,
    pos,
    children,
    cursor_before_child = 0;

  if (!element) {
    return;
  }

  children = Array.from(element.children);

  children.forEach(child => {
    rect = child.getBoundingClientRect();

    if (cursor_coord.y <= rect.y) {
      cursor_before_child += 1;
    }
  });

  pos = children.length - cursor_before_child;

  return pos;
}

export {
  get_pos_within_siblings,
  get_cursor_pos_within_element
}
