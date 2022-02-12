import Modifier from 'ember-modifier';
import bootstrap from 'bootstrap';


export default class TooltipModifier extends Modifier {

  tooltip = undefined;

  didReceiveArguments() {
    let { title } = this.args.named;

    if (!this.tooltip) {
      this.tooltip = new bootstrap.Tooltip(
        this.element,
        {
          'title': title,
          'placement': 'right',
          'trigger': 'hover'
        }
      );
    }
  }
}
