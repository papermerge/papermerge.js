import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';



export default class ViewModeComponent extends Component {

  @tracked items = A([
    {
      title: 'List',
      value: 'list',
      is_checked: true
    },
    {
      title: 'Grid',
      value: 'grid',
      is_checked: false
    },
  ]);

  get view_mode() {
    return this.args.viewMode || 'list';
  }

  @action
  onItemClick(item) {
    this.args.onViewModeChange(item.value);
  }
}
