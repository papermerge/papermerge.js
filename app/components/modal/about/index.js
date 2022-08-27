import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { version } from 'papermerge/version';


export default class AboutComponent extends Component {
  get papermerge_version() {
    return this.args.getPapermergeVersion;
  }

  get backend_version() {
    return this.args.papermerge_version_result;
  }

  get frontend_version() {
    return version;
  }

  @action
  onClose() {
    this.args.onClose();
  }
}
