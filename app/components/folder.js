import { A } from '@ember/array';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class FolderComponent extends Component {

  get query() {
    if (this.args.extranode) {
      return {
        extranode_id: this.args.extranode.id
      }
    }

    return {};
  }
}
