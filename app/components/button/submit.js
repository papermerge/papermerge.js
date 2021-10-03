import Component from '@glimmer/component';


class ButtonSubmitComponent extends Component {
  /*
  "Submit Button" component. Renders a button as either
  html <a> tag or as <button>.

  Arguments:
    @route - if `route` argument is provided, button will
      be rendered as <a>.
    @onClick - if `onClick` argument is provided - button
      will be rendered as <button>.
    @text - button's text. Default value is "Submit".

  Examples:

    Render component as <button> with `onClick` handler:

      <Button::Submit @onClick={{this.onCancel}} />

    Render componet as <a> with given route:

      <Button::Submit @route="automates" />
  */

  get text() {
    return this.args.text || "Submit";
  }
}

export default ButtonSubmitComponent;