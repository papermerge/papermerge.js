import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { TrackedArray } from 'tracked-built-ins';


export default class TagsModalComponent extends Component {
  @service store;
  @service currentUser;

  // newly added tags
  @tracked tags = new TrackedArray([]);
  // trigger a change when one of initial value tags changed
  // i.e. was removed;
  @tracked initial_node_tags_tracker = 0;


  @action
  async onSubmit() {
    this.args.onSubmit({
      tags: this.new_tags.map(tag => tag.name),
      node: this.args.node
    });
    this.tags = new TrackedArray([]);
  }

  @action
  onCancel() {
    this.args.onCancel();
    this.tags = new TrackedArray([]);
  }

  @action
  onTagAdd(tag) {
    this.tags.push(tag);
  }

  @action
  onTagRemove(tag) {
    let index;

    index = this.tags.findIndex(item => item.name == tag.name);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    index = this.initial_node_tags.findIndex(item => item.name == tag.name);

    if (index >= 0) {
      this.initial_node_tags.splice(index, 1);
      this.initial_node_tags_tracker = this.initial_node_tags.length;
    }
  }

  get new_tags() {

    // this value is here to trigger a change
    // when one of the initial tags was removed;
    this.initial_node_tags_tracker;

    if (this.tags && this.tags.length > 0) {
      // combine initial tags and newly added tags
      return [...this.initial_node_tags, ...this.tags];
    }

    return this.initial_node_tags;
  }

  get initial_node_tags() {
    if (this.args.node) {
      return this.args.node.tags;
    }

    return [];
  }
}
