import Modifier from 'ember-modifier';
import bootstrap from 'bootstrap';


export default class TooltipModifier extends Modifier {

  didReceiveArguments() {
    let { title, placement } = this.args.named;
    let delay = 1000;

    if (this.args.named['delay']) {
      delay = this.args.named['delay'];
    }

    if (!placement) {
      placement = 'right';
    }

    this.tooltip = new bootstrap.Tooltip(
      this.element,
      {
        'title': title,
        'placement': placement,
        'trigger': 'hover',
        'delay': delay
      }
    );
  }

  willDestroy() {
    this.tooltip.hide();
  }
}
