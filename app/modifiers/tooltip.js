import Modifier from 'ember-modifier';
import bootstrap from 'bootstrap';
import { registerDestructor } from '@ember/destroyable';


export default class TooltipModifier extends Modifier {

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, this.cleanup);
  }

  modify(element, positional, named) {
    let { title, placement } = named;
    let delay = 1000;

    if (named['delay']) {
      delay = named['delay'];
    }

    if (!placement) {
      placement = 'right';
    }

    this.tooltip = new bootstrap.Tooltip(
      element,
      {
        'title': title,
        'placement': placement,
        'trigger': 'hover',
        'delay': delay
      }
    );
  }

  cleanup = () => {
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }
}
