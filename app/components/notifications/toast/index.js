import Component from '@glimmer/component';


export default class ToastComponent extends Component {
  get type() {
    return this.args.notification.type;
  }

  get message() {
    return this.args.notification.message;
  }
}