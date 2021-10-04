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
    @enabled - if true - button will be rendered as enabled.
      applies only on <button> based component.
    @text - button's text. Default value is "Submit".

  Examples:

    Render component as <button> with `onClick` handler:

      <Button::Submit @onClick={{this.onCancel}} />

    Render componet as <a> with given route:

      <Button::Submit @route="automates" />

    Render disabled "Create Group" <button> based component:

      <Button::Submit
        @onClick={{this.onCreate}}
        @enabled={{this.new_name}}
        @text="Create Group" />
  */

  get text() {
    return this.args.text || "Submit";
  }

}

export default ButtonSubmitComponent;