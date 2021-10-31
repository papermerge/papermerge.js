import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class NewFolderComponent extends Component {
  @tracked title = '';

  @action
  onSubmit() {
    console.log(`title ${this.title}`);
  }
}
