import { action } from '@ember/object';
import Modifier from 'ember-modifier';
import Rectangle from 'papermerge/utils/rectangle';



class UISelect {
  /**
    Desktop like select
  **/

  get DRAG_THRESHOLD() {
    /*
      Some mouse clicks are acompanied by slight mouse movements, which
      makes 'clicks' look like mouse drag events. In order the avoid
      this confusion, DRAG_THRESHOLD is introduced. Any rectangle with
      height or width < DRAG_THRESHOLD will be discarded.
    */
    return 4;
  }

  constructor(parent_selector) {
    /***
      x, y coordinates where selection started.
      parent - dom parent element. Selection DOM element
      will be attached to parent and it's coordinates
      will be relative to the parent DOM.
    **/
    // x,y where selection started
    this.start_x = 0;
    this.start_y = 0;
    this.current_x = 0;
    this.current_y = 0;
    this.parent = parent_selector;
    this.select_div = document.getElementById('ui-select');
  }

  init(x, y) {
    this.start_x = x;
    this.start_y = y;
  }

  show(x, y) {
    this.visibility = 'visible';
    this.top = `${x}px`;
    this.left  = `${y}px`;
  }

  hide() {
    this.visibility = 'hidden';
  }

  update(x, y) {
    let height, width, top, left;


    this.show(x, y);
    this.current_x = x;
    this.current_y = y;

    width = Math.abs(this.current_x - this.start_x);
    height = Math.abs(this.current_y - this.start_y);

    if (this.select_div) {

      if (this.current_y <  this.start_y) {
        this.top = `${this.current_y + 7}px`;
        top = this.current_y + 7;
      } else {
        this.top = `${this.start_y}px`;
        top = this.start_y;
      }
      if (this.current_x <  this.start_x) {
        this.left = `${this.current_x + 7}px`;
        left = this.current_x + 7;
      } else {
        this.left = `${this.start_x}px`;
        left = this.start_x;
      }
      this.width = `${width}px`;
      this.height = `${height}px`;

      const { selected_nodes, unselected_nodes } = this.get_nodes_selection(
        new Rectangle(left, top, width, height)
      );

      if (width < this.DRAG_THRESHOLD && height < this.DRAG_THRESHOLD) {
        console.log('Not passing DRAG_THRESHOLD. Ignored.');
        return;
      }

      this.select_nodes(selected_nodes);
      this.unselect_nodes(unselected_nodes);
    }
  }

  get_nodes_selection(selection_rect) {
    /**
      selection_rect is instance of utils.Rectangle
    **/
    let selected_nodes = [], unselected_nodes = [], nodes_arr;

    nodes_arr = Array.from(
      document.getElementsByClassName('node')
    );


    nodes_arr.forEach(element => {
      let _r, rect;

      _r = element.getBoundingClientRect();
      rect = new Rectangle(_r.x, _r.y, _r.width, _r.height);

      if (rect.intersect(selection_rect)) {
        selected_nodes.push(element);
      } else {
        unselected_nodes.push(element);
      }
    });

    return {selected_nodes, unselected_nodes};
  }

  select_nodes(elements) {
    let input_el;

    elements.forEach(element => {
      input_el = element.querySelector('input');
      if (input_el && !input_el.checked) {
        input_el.click();
      }
    });
  }

  unselect_nodes(elements) {
    let input_el;

    elements.forEach(element => {
      input_el = element.querySelector('input');
      if (input_el && input_el.checked) {
        input_el.click();
      }
    });
  }

  deselect_all_nodes() {
    let input_el, nodes_arr;

    nodes_arr = Array.from(
      document.getElementsByClassName('node')
    );

    nodes_arr.forEach(element => {
      input_el = element.querySelector('input');
      if (input_el && input_el.checked) {
        input_el.click();
      }
    });
  }

  get is_dragging() {
    /*
      Is this a dragging ?

      Selection can only start OUTSIDE nodes (in that space
      between nodes, available grid mode).
      If starting point is INSIDE any node, this is dragging operation.
      Again:
        starting poing INSIDE ANY NODE -> this is dragging
        starting point OUTSIDE ALL NODES -> this is selection
    */

    let nodes_arr, that = this, result = false;

    nodes_arr = Array.from(
      document.getElementsByClassName('node')
    );

    nodes_arr.forEach(element => {
      let _r, rect;

      _r = element.getBoundingClientRect();
      rect = new Rectangle(_r.x, _r.y, _r.width, _r.height);
      if (rect.contains_point(that.start_x, that.start_y)) {
        result = true;
      }
    });

    return result;
  }

  set width(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.width = value;
  }

  set height(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.height = value;
  }

  set top(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.top = value;
  }

  set left(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.left = value;
  }

  set visibility(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.visibility = value;
  }

}


export default class UISelectModifier extends Modifier {
  /*
  * Desktop like select is enabled ONLY when (commander is) in grid mode
  i.e. when items to select are showed like a grid.

  When displayed like a grid there is a some space between items which enables
  user to create a selection rectangle. On other hand, when in list mode, there is not
  much space between items and selection interferes with drag and drop features i.e.
  user tries to select an items, but it looks like user tries to drag it.
  */

  ui_select = undefined;

  addEventListener() {
    if (this.is_enabled) {
      this.element.addEventListener('mousedown', this.onMouseDown);
      this.element.addEventListener('mouseup', this.onMouseUp);
      this.element.addEventListener('mousemove', this.onMouseMove);
    }
  }

  removeEventListener() {
    if (this.is_enabled) {
      this.element.removeEventListener('mousedown', this.onMouseDown);
      this.element.removeEventListener('mouseup', this.onMouseUp);
      this.element.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  // lifecycle hooks
  didReceiveArguments() {
    if (this.is_enabled) {
      this.removeEventListener();
      this.addEventListener();

      this.ui_select = new UISelect(this.element);
    }
  }

  willDestroy() {
    if (this.is_enabled) {
      this.removeEventListener();
    }
  }

  @action
  onMouseMove(event) {
    if (this.is_enabled) {
      if (!event.buttons) {
        this.hide();
      } else if (this.ui_select) {
        this.ui_select.update(event.clientX, event.clientY);
      }
    }
  }

  @action
  onMouseUp() {
    if (this.is_enabled) {
      this.hide();
    }
  }

  @action
  onMouseDown(event) {
    if (this.is_enabled) {
      this.ui_select.init(event.clientX, event.clientY);
    }
  }

  hide() {
    if (this.is_enabled) {
      if (this.ui_select) {
        this.ui_select.hide();
      }
    }
  }

  get is_enabled() {
    let view_mode = this.args.named['view_mode'],
      enabled_on = this.args.named['enabled_on'];

    return view_mode === enabled_on;
  }
}
