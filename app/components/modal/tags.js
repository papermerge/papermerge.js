import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { TrackedArray } from 'tracked-built-ins';
import { action } from '@ember/object';
import { service } from '@ember/service';


export default class TagsModalComponent extends Component {
  @tracked tags = new TrackedArray([]);
  @service store;
  @service currentUser;

  @action
  async onSubmit() {
    this.args.onSubmit({
      tags: this.tags.map(tag => tag.name),
      node: this.args.node
    });
    this._reset();
  }

  @action
  onCancel() {
    this.args.onCancel();
    this.title = '';
  }

  _reset() {
    this.tags = new TrackedArray([]);
  }

}
