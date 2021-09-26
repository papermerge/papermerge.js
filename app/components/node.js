import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NodeComponent extends Component {
  @action
  updateBreadcrumb(node) {
    console.log(`Node ${node} clicked`);
  }
}
