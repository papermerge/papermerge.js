import Component from '@glimmer/component';
import Point from 'papermerge/utils/point';
import { action } from '@ember/object';
import { get_cursor_pos_within_element } from 'papermerge/utils/dom';


export default class ViewerThumbnailsComponent extends Component {

  @action
  onDragendCancel({event, element}) {
    element.classList.remove('is-being-dragged');
  }

  @action
  onDragendSuccess({event, element}) {
    element.classList.remove('is-being-dragged');
  }

  @action
  onDrop({event, element}) {
    let data,
      json_data,
      page_ids,
      original_pos,
      drop_pos,
      source_doc_id;

    event.preventDefault();
    data = event.dataTransfer.getData('application/x.page');
    if (!data) {
      console.warn('Accepts only application/x.page data');
      return;
    }
    json_data = JSON.parse(data);

    original_pos = json_data['original_pos']
    page_ids = json_data['pages'].map(page => page.id);
    source_doc_id = json_data['source_doc_id'];

    document.querySelector('.is-being-dragged').forEach(
      item => item.classList.remove('is-being-dragged')
    );
    drop_pos = get_cursor_pos_within_element(
      element,
      new Point(event.clientX, event.clientY)
    );

    if (source_doc_id == this.args.doc.id) {
      // pages moved within same document
      this.args.onThumbnailsPositionChanged({
        original_pos, drop_pos, page_ids
      });
    } else {
      // pages moved to another document
      this.args.onIncomingPages({
        page_ids, drop_pos
      });
    }
  }

  @action
  onDragOver({event, element}) {
    /*
    Creates DOM placeholder suggesting to user that here he/she can drop the page.

    Only one placeholder DOM element is allowed.
    */
    let thumbnail_dom_items,
      cursor_coord,
      pos,
      rect,
      cursor_before_child = 0,
      outside_all_thumbnails = true,
      svg_element,
      data,
      json_data,
      original_pos;

    if (!element) {
      return;
    }

    data = event.dataTransfer.getData('application/x.page');
    if (!data) {
      console.warn('Accepts only application/x.page data');
      return;
    }
    json_data = JSON.parse(data);

    original_pos = json_data['original_pos']

    cursor_coord = new Point(event.clientX, event.clientY);
    thumbnail_dom_items = Array.from(element.children);

    thumbnail_dom_items.forEach(thumbnail_dom_item => {
      // page_item is DOM element which may be real thumbnail of the page or
      // it may be a paceholder used as suggestion that it is OK to drop page here.
      // Real page thumbnail DOM element contains DOM element for image/svg
      // and DOM element denoting page number
      svg_element = thumbnail_dom_item.querySelector('svg');
      if (svg_element) { // in case of thumbnail placeholder, there won't be SVG element
        rect = svg_element.getBoundingClientRect();

        if (cursor_coord.y <= rect.bottom) {
          cursor_before_child += 1;
        }
        console.log(`cursor_before_child=${cursor_before_child}`);
        // Check if cursor position is outside of any thumbnail i.e.
        // position to drop will be suggested only in case cursor coordinate
        // is BETWEEN thumbnails images/svg
        if ((cursor_coord.y < rect.bottom) && (cursor_coord.y > rect.top)) {
          outside_all_thumbnails = false;
        }
      }
    });

    // position where to suggest page drop
    if (element.querySelector('.drop-placeholder')) {
      pos = thumbnail_dom_items.length - cursor_before_child - 1;
    } else {
      pos = thumbnail_dom_items.length - cursor_before_child;
    }

    if (outside_all_thumbnails) {
      // suggest position to drop ONLY if cursor is outside of all thumbnails
      console.log(`pos=${pos}; original_pos=${original_pos}`);
      if (original_pos != pos) {
        this.args.onAddThumbnailPlaceholderAt(pos);
      }
    } else {
      this.args.onRemoveThumbnailPlaceholder();
    }
  }

  @action
  onDragEnter() {
  }

  @action
  onDragLeave() {
  }
}
