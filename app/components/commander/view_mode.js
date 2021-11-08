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

  @tracked current_item = 'list';


  @action onItemClick(item) {
    this.current_item = item.value;
    this.args.onViewModeChange(item.value);
  }

}
