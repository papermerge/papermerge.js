import Modifier from 'ember-modifier';


export default class ZoomFactorModifier extends Modifier {
  didReceiveArguments() {
    let zoom_factor = this.args.positional[0];

    this.element.style.width = `${zoom_factor}%`;
  }

}