import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';


export default class TagsModalComponent extends Component {
  @tracked tags = '';
  @service store;
  @service currentUser;

  @action
  async onSubmit() {
    this.args.onSubmit(this.tags);
  }

  @action
  onCancel() {
    this.args.onCancel();
    this.title = '';
  }
}
