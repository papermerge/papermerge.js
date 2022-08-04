import Component from '@glimmer/component';


export default class BaseComponent extends Component {
  get submitButtonClass() {
    return this.args.submitButtonClass || "btn-primary";
  }
}
