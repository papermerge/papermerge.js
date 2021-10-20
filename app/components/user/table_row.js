import Component from '@glimmer/component';
import { action } from '@ember/object';


class TableRowComponent extends Component {
  @action
  async onRemove(user) {
    await user.destroyRecord();
  }
}

export default TableRowComponent;