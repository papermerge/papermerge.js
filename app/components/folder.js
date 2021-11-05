import Component from '@glimmer/component';


export default class FolderComponent extends Component {

  get query() {
    if (this.args.extranode) {
      return {
        extranode_id: this.args.extranode.id
      }
    }

    return {};
  }

  get model() {
    return this.args.model;
  }
}
