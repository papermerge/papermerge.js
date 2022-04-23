import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { TrackedArray } from 'tracked-built-ins';


export default class TagInputComponent extends Component {

  @tracked tags = new TrackedArray([]);
  @tracked new_tag_value = '';
  @service store;

  @action
  onAddTag() {
    let tags, found_tag, new_value;

    tags = this.store.peekAll('tag');
    new_value = this.new_tag_value.trim();
    found_tag = tags.find(item => item.name == new_value);

    if (found_tag) {
      this.tags.push(found_tag);
    } else {
      this.tags.push({
        name: new_value
      });
    }
    // reset user input
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
