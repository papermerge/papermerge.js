import Modifier from 'ember-modifier';
import bootstrap from 'bootstrap';


export default class TooltipModifier extends Modifier {

  didReceiveArguments() {
    let { title } = this.args.named;

    return new bootstrap.Tooltip(
      this.element,
      {
        'title': title,
        'placement': 'right',
        'trigger': 'hover'
      }
    );
  }
}
