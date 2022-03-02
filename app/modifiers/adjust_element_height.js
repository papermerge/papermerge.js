import Modifier from 'ember-modifier';


export default class AdjustElementHeightModifier extends Modifier {
  /*
    This modifier will calculate height of the element so the element
    will fit in visible area without overflows.

    This modifier was written having in mind '.pages' and '.thumbnails'
    components of viewer. The '.pages' and '.thumbnails' heights (i.e.
    elements' height) must be so that '.pages' and '.thumbnails' will
    ocupy whole visible screen area without overflowing it.
  */
  didInstall() {
    let height = this._getCorrectHeight();

    this.element.style.height = `${height}px`;
  }

  _getCorrectHeight() {
    let ret;

    ret = window.innerHeight;
    ret -= this._getNavbarHeight();
    ret -= this._getBreadcrumbHeight();
    ret -= this._getActionButtonsHeight();
    ret -= 60; // guessing here, in theory this value should be
    // calculeted based on padding/margin of various dom elements

    return ret;
  }

  _getComputedHeight({element_id, element_class, default_value}) {
    let el, styles, height;

    if (element_id) {
      el = document.getElementById(element_id);
    } else if (element_class) {
      el  = document.getElementsByClassName(element_class)[0];
    }

    if (!el) {
      if (element_id) {
        console.error(`Element with ID ${element_id} not found`);
      }
      if (element_class) {
       console.error(`Element with class name ${element_class} not found`);
      }
      return default_value; // blunt guess of element height
    }

    styles = window.getComputedStyle(el);

    height = parseInt(styles.height);
    height += parseInt(styles.marginTop);
    height += parseInt(styles.marginBottom);

    if (element_id) {
      console.log(`ID=${element_id}: height=${styles.height}`);
      console.log(`ID=${element_id}: marginTop=${styles.marginTop}`);
      console.log(`ID=${element_id}: marginBottom=${styles.marginBottom}`);
    } else {
      console.log(`element_class=${element_class}: height=${styles.height}`);
      console.log(`element_class=${element_class}: marginTop=${styles.marginTop}`);
      console.log(`element_class=${element_class}: marginBottom=${styles.marginBottom}`);
    }
    return height;
  }

  _getNavbarHeight() {
    return this._getComputedHeight({
      element_id: 'nav-topbar',
      default_value: 56
    });
  }

  _getBreadcrumbHeight() {
    return this._getComputedHeight({
      element_class: 'nav-breadcrumb',
      default_value: 40
    });
  }

  _getActionButtonsHeight() {
    return this._getComputedHeight({
      element_class: 'action-buttons',
      default_value: 40
    });
  }
}