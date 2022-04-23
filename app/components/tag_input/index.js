import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';


export default class TagInputComponent extends Component {

  @tracked new_tag_value = '';
  @service store;

  @action
  onAddTag(event) {
    /*
    Keydown triggered on space/comma.

    Adds tag specified by name `this.new_tag_value` to
    the list of tags associated with given node.
    */
    let found_tag, new_value;

    // prevents space/comma character itself to be included in <input />
    event.preventDefault();

    new_value = this.new_tag_value.trim();
    found_tag = this.all_local_tags.find(item => item.name == new_value);

    if (found_tag) {
      // user chose to associate node one of existing tags
      this.tags.push(found_tag);
    } else {
      // user wishes to create a new tag
      // at this point tag will use default color.
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

  get tags() {
    return this.args.tags;
  }

  get all_local_tags() {
    /*
    Returns all local tags (tags available in local ember data)
    */
    return this.store.peekAll('tag');
  }

  get placeholder() {
    return "Add a tag..."
  }

  get readOnly() {
    return false;
  }
}
