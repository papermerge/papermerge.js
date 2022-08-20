import Component from '@glimmer/component';
import Point from 'papermerge/utils/point';
import { action } from '@ember/object';
import {
  RWDataTransfer
} from 'papermerge/utils/rw_data_transfer';


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
      drop_placeholder_pos,
      source_doc_id;

    event.preventDefault();
    data = event.dataTransfer.getData('application/x.page');

    if (!data) {
      console.warn('Thumbnails:onDrop: Accepts only application/x.page data');
      return;
    }
    json_data = JSON.parse(data);

    page_ids = json_data['pages'].map(page => page.id);
    source_doc_id = json_data['source_doc_id'];

    if (source_doc_id == this.args.doc.id) {
      // pages moved within same document
      this.args.onThumbnailsPositionChanged(page_ids);
    } else {
      // pages moved to another document

      drop_placeholder_pos = this.args.pages.findIndex(
        item => item.is_drop_placeholder
      );

      if (drop_placeholder_pos < 0) {
        drop_placeholder_pos = 0;
      }

      this.args.onIncomingPages({
        page_ids: page_ids,
        drop_pos: drop_placeholder_pos
      });
    }
  }

  @action
  onDragOver({event, element}) {
    /*
    Creates DOM placeholder suggesting to user that here he/she can drop the page.

    Only one placeholder DOM element is allowed.

    Data availability
    -----------------

    The HTML5 Drag and Drop Specification dictates a drag
    data store mode. This may result in unexpected behavior, being
    DataTransfer.getData() not returning an expected value, because not all
    browsers enforce this restriction.

    During the *dragstart* and *drop events, it is safe to access the data. For all
    other events, the data should be considered unavailable. Despite this, the
    items and their formats can still be enumerated.
    */
    let thumbnail_dom_items,
      cursor_coord,
      suggested_pos,
      rect,
      cursor_before_child = 0,
      outside_all_thumbnails = true,
      svg_or_img_element,
      source_doc_id,
      original_pos,
      rw_data;

    if (!element) {
      return;
    }

    rw_data = new RWDataTransfer({
      ro_data_transfer: event.dataTransfer
    });

    original_pos = rw_data.get('original_pos');
    if (original_pos) {
      original_pos = parseInt(original_pos);
    }
    source_doc_id = rw_data.get('source_doc_id');

    cursor_coord = new Point(event.clientX, event.clientY);
    thumbnail_dom_items = Array.from(element.children);

    thumbnail_dom_items.forEach(thumbnail_dom_item => {
      // page_item is DOM element which may be real thumbnail of the page or
      // it may be a paceholder used as suggestion that it is OK to drop page here.
      // Real page thumbnail DOM element contains DOM element for image/svg
      // and DOM element denoting page number
      svg_or_img_element = thumbnail_dom_item.querySelector('svg') ||
        thumbnail_dom_item.querySelector('img');
      if (svg_or_img_element) { // in case of thumbnail placeholder, there won't be SVG element
        rect = svg_or_img_element.getBoundingClientRect();

        if (cursor_coord.y <= rect.bottom || cursor_coord.y <= rect.top) {
          cursor_before_child += 1;
        }
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
      suggested_pos = thumbnail_dom_items.length - cursor_before_child - 1;
    } else {
      suggested_pos = thumbnail_dom_items.length - cursor_before_child;
    }

    // suggest position to drop ONLY if cursor is outside of all thumbnails
    if (outside_all_thumbnails) {
      if (source_doc_id !== this.args.doc.id) {
        // when dragging pages from source document target document (src != target)
        // then suggested thumbail can be inserted at any position
        event.preventDefault();
        this.args.onAddThumbnailPlaceholderAt(suggested_pos);
      } else if (Math.abs(original_pos - suggested_pos) >= 1 && suggested_pos != original_pos + 1) {
        // when dragging pages withing same document suggested position should not
        // be immediately next to dragged page
        event.preventDefault(); // prevent default to allow drop
        this.args.onAddThumbnailPlaceholderAt(suggested_pos);
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
