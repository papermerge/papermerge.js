import Component from '@glimmer/component';


export default class BreadcrumbItemComponent extends Component {
  get show_spinner() {
    if (this.args.onNodeClicked.isRunning) {
      if (this.args.node_clicked_state['hint'] == this.args.hint) {
        return true;
      }
    };

    return false;
  }
}
