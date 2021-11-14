import NodeComponent from "../node";


export default class FolderComponent extends NodeComponent {

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
