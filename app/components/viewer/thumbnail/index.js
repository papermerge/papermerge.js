import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class ViewerThumbnailComponent extends Component {

  @action
  onDblClick() {
    this.args.onDblClick(this.args.page);
  }

  @action
  onCheckboxChange(event) {
    let is_checked = event.target.checked;

    this.args.onCheckboxChange({
      page: this.args.page,
      is_selected: is_checked
    });
  }

  get is_selected() {
    let page = this.args.page,
      selected_page_ids;

    if (!this.args.selectedPages) {
      return false;
    }

    selected_page_ids = this.args.selectedPages.map(
      page => page.id
    );

    if (selected_page_ids.includes(page.id)) {
      return true;
    }

    return false;
  }

  set is_selected(value) {

  }
}