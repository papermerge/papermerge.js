import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class ViewComponent extends Component {

  @service requests;

  @action
  onRunOCR() {
    this.requests.runOCR(this.args.document_version.id);
  }
}