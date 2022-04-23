import TagItemComponent from 'papermerge/components/tag/item';
import { action } from '@ember/object';


export default class TagInputItemComponent extends TagItemComponent {

  @action
  onRemoveTagItem() {
    this.args.onRemoveTagItem(this.args.index);
  }
}