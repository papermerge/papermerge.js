import Component from '@glimmer/component';


export default class BreadcrumbItemComponent extends Component {
  get show_spinner() {
    let state;

    if (this.args.onNodeClicked.isRunning) {
      if (this.args.node_clicked_state['hint'] == this.args.hint) {
        return true;
      }
    };

    state = this.args.currently_loading_state;

    if (state.node_id && state.hint == this.args.hint) {
      return true;
    }

    return false;
  }
}
