import Component from '@glimmer/component';


export default class ActionButtonsComponent extends Component {

  get is_any_page_selected() {
    return this.args.selectedPages.length > 0;
  }
}