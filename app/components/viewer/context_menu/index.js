import Component from '@glimmer/component';


export default class ViewerContextMenuComponent extends Component {

  get one_or_multiple_pages_selected() {
    return this.args.selectedPages.length >= 1;
  }
}
