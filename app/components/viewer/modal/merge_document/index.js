import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';


export default class MergeDocumentComponent extends Component {
  @service store;
  @service currentUser;
  @tracked single_page = true;
  @tracked _title_format;
  @tracked error_message;

  @action
  async onSubmit() {
    this.args.onSubmit.perform();
  }

  get dst_title() {
    if (this.args.extra && this.args.extra.current_node) {
      return this.args.extra.current_node.title;
    }
    return '';
  }

  get inProgress() {
    return this.args.onSubmit.isRunning;
  }

  get title() {
    return this.args.doc.title;
  }

  @action
  onCancel() {
  }

}
