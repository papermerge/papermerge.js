import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import Controller from '@ember/controller';



export default class SectionController extends Controller {

  @service requests;
  @service router;

  changed_prefs = {};
  @tracked prefs_changed = false;

  get disabled() {
    return !this.prefs_changed;
  }

  @action
  onSubmit() {
    this.requests.preferencesUpdate(this.changed_prefs);
  }

  @action
  onCancel() {
    this.router.transitionTo('authenticated.preferences');
  }

  @action
  onChange({identifier, value}) {
    this.changed_prefs[identifier] =  value;
    this.prefs_changed = true;
  }
}
