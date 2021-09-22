import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DocumentsListComponent extends Component {
  @action
  showDocument(doc) {
    alert(`The person's name is ${doc}!`);
  }
}