import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';


export default class TokenTableRowComponent extends Component {
  @service store;

  @action
  async onRemove(token) {
    await token.destroyRecord();
  }
}
