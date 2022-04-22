import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { TrackedArray } from 'tracked-built-ins';


export default class TagInputComponent extends Component {

  @tracked tags = new TrackedArray([]);
  @tracked new_tag_value = '';

  @action
  onAddTag() {
    this.tags.push({
      name: this.new_tag_value
    });
    this.new_tag_value = '';
  }

  @action
  onRemoveTagItem(index) {
    this.tags.splice(index, 1);
  }

  get placeholder() {
    return "Add a tag..."
  }

  get readOnly() {
    return false;
  }
}
