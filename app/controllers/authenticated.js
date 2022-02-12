import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking'


export default class AuthenticatedController extends Controller {
  @tracked expanded = true;

  @action
  onSidebarToggle() {
    this.expanded = !this.expanded;
    console.log(`this.expanded=${this.expanded}`);
  }
}