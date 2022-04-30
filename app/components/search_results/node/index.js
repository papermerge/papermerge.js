import Component from '@glimmer/component';



export default class NodeComponent extends Component {

  max_visible_tags = 5;

  get tags() {
    return this.args.result_node.tags.slice(
      0,
      this.max_visible_tags
    );
  }

  get more_than_max_visible_tags() {
    if (this.args.result_node.tags) {
      if (this.args.result_node.tags.length > this.max_visible_tags) {
        return true;
      }
    }

    return 0;
  }

}
