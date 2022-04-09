import Modifier from 'ember-modifier';
import bootstrap from 'bootstrap';


export default class TooltipModifier extends Modifier {

  didReceiveArguments() {
    let { title, placement } = this.args.named;

    if (!placement) {
      placement = 'right';
    }

    this.tooltip = new bootstrap.Tooltip(
      this.element,
      {
        'title': title,
        'placement': placement,
        'trigger': 'hover'
      }
    );
  }

  willDestroy() {
    this.tooltip.hide();
  }
}
