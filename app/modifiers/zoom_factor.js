import Modifier from 'ember-modifier';


export default class ZoomFactorModifier extends Modifier {

  modify(element, positional, named) {
    let zoom_factor = positional[0];

    element.style.width = `${zoom_factor}%`;
  }

}