import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';


export default class RunOCRModalComponent extends Component {
  @tracked _lang;

  get ocr_language_options() {
    return [
      { key: 'deu', value: 'Deutsch' },
      { key: 'eng', value: 'English' },
    ]
  }

  @action
  onLanguageChanged(event) {
    let lang = event.target.value;
  }

  @action
  async onSubmit() {
    this.args.onSubmit(this.lang);
  }

  get lang() {
    return this._lang;
  }

  @action
  onCancel() {
  }

}
