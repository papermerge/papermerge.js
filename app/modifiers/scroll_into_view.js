import Modifier from 'ember-modifier';


export default class ScrollIntoViewModifier extends Modifier {

  modify(element, positional, named) {
    let page, scroll_to_page;

    page = named['page'];
    scroll_to_page = named['scroll_to_page'];

    if (!page) {
      return;
    }

    if(!scroll_to_page) {
      return;
    }

    if (page.id == scroll_to_page.id) {
      element.scrollIntoView();
    }
  }
}
