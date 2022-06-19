import Component from '@glimmer/component';
import { action } from '@ember/object';


class TableRowComponent extends Component {
  @action
  async onRemove(group) {
    await group.destroyRecord();
  }
}

export default TableRowComponent;
