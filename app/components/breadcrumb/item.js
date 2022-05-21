import Component from '@glimmer/component';


export default class BreadcrumbItemComponent extends Component {
  get show_spinner() {
    let state;

    if (this.args.loadData && this.args.loadNodeData.isRunning) {
      if (this.args.loadNodeData.hint && this.args.hint) {
        if (this.args.loadNodeData.hint == this.args.hint) {
          return true;
        }
      }
    };

    state = this.args.currently_loading_state;

    if (state && state.node_id && state.hint == this.args.hint) {
      return true;
    }

    return false;
  }
}
