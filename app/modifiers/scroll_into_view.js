import Modifier from 'ember-modifier';


export default class ScrollIntoViewModifier extends Modifier {

  didReceiveArguments() {
    let page, scroll_to_page;

    page = this.args.named['page'];
    scroll_to_page = this.args.named['scroll_to_page'];

    if (!page) {
      return;
    }

    if(!scroll_to_page) {
      return;
    }

    if (page.id == scroll_to_page.id) {
      this.element.scrollIntoView();
    }
  }
}
