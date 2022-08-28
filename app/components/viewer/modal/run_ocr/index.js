import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';


export default class RunOCRModalComponent extends Component {
  @tracked _lang;

  get ocr_language_options() {
    let langs;

    if (this.args.ocr_languages) {
      langs = this.args.ocr_languages['languages'];

      return langs.map(item => {
        let result = {
          'key': item[0],
          'value': item[1],
          'selected': false
        };

        if (this.args.ocr_languages['current_value'] == item[0]) {
          result['selected'] = true;
        }

        return result;
      });
    }

    return [];
  }

  get getOCRLanguages() {
    return this.args.getOCRLanguages;
  }

  @action
  onLanguageChanged(event) {
    this._lang = event.target.value;
  }

  @action
  async onSubmit() {
    let lang;

    if (this._lang) {
      lang = this._lang;
    } else {
      lang = this.args.ocr_languages['current_value'];
    }

    this.args.onSubmit(lang);
  }

  get lang() {
    return this._lang;
  }

  @action
  onCancel() {
  }

}
