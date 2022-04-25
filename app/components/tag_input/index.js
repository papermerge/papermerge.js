import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';


export default class TagInputComponent extends Component {
  /*
    Input element with tags.

    Comma/Space keys are tag separators.
    Backspace key removes last tag in the list.

    Arguments:
      @tags: tags to view/edit
      @onTagAdd(tag): action to be triggered when tag is added
      @onTagRemove(tag): action to be triggered when tag is removed

      Tag passed as argument to @onTagAdd/@onTagRemove is an object
      with at least one property ``name``.
  */
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
      this.args.onTagAdd(found_tag);
    } else {
      // user wishes to create a new tag
      // at this point tag will use default color.
      this.args.onTagAdd({name: new_value});
    }
    // reset user input
    this.new_tag_value = '';
  }

  @action
  onRemoveTagItem(index) {
    this.args.onTagRemove(this.tags[index]);
  }

  @action
  onRemoveLastTagItem() {
    /*
    Triggered on backspace key
    */
    let len = this.tags.length;

    if (len > 0) {
      this.args.onTagRemove(this.tags[len - 1]);
    }
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
