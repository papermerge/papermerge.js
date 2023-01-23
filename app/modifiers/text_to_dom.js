import Modifier from 'ember-modifier';


export default class TextToDom extends Modifier {
  /*
  Converts plain text to HTML DOM elements and inserts them
  as children to `this.element`

  Autocomplete receives text matching highlights as plain text e.g.

    "This is <em>great</em> match".

  Besides the fact that you cannot style plain text, it is also
  rendered with <em> tag.
  To fix this problem hightlight text is converted to DOM nodes.
  */
  modify(element, positional, named) {

    let text = positional[0],
      template,
      nodes,
      that = this,
      em_element,
      text_element;

    // inspired from https://stackoverflow.com/a/35385518
    // HTML5's <template> tag can be used to convinently convert
    // text into DOM nodes
    template = document.createElement('template');
    template.innerHTML = text;

    // voila!
    nodes = template.content.childNodes;

    nodes.forEach(node => {
      // is it <em>some match</em> ?
      if (node.nodeName == 'EM') {
        em_element = document.createElement('em');
        em_element.textContent = node.firstChild.textContent;
        that.element.appendChild(em_element);
      } else {
        // otherwise node is a plain text
        text_element = document.createTextNode(node.textContent);
        that.element.appendChild(text_element);
      }
    });
  }

}
