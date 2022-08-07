import Component from '@glimmer/component';

class ButtonCancelComponent extends Component {
  /*
  "Cancel Button" component. Renders a button as either
  html <a> tag or as <button>.

  Arguments:
    @route - if `route` argument is provided, button will
      be rendered as <a>.
    @onClick - if `onClick` argument is provided - button
      will be rendered as <button>.
    @text - button's text. Default value is "Cancel".

  Examples:

    Render component as <button> with `onClick` handler:

      <Button::Cancel @onClick={{this.onCancel}} />

    Render componet as <a> with given route:

      <Button::Cancel @route="groups" />
  */

  get text() {
    return this.args.text || 'Cancel';
  }
}

export default ButtonCancelComponent;
