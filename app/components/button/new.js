import Component from '@glimmer/component';


class ButtonNewComponent extends Component {
  /*
    "New Button" component. Renders a button as either
    html <a> tag or as <button>.

    Arguments:
      @route - if `route` argument is provided, button will
        be rendered as <a>.
      @onClick - if `onClick` argument is provided - button
        will be rendered as <button>.
      @text - button's text. Default value is "New".

    Examples:

      Render component as <button> with `onClick` handler:

        <Button::New @onClick={{this.onToggleNew}} />

      Render componet as <a> with given route:

        <Button::New @route="automates.add" />
  */

  get text() {
    return this.args.text || "New";
  }
}

export default ButtonNewComponent;