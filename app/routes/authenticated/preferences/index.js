import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class PreferencesRoute extends Route {

  @service requests;

  async model() {
    const prefs = await this.requests.preferences();
    const json_prefs = await prefs.json();
    let sections = [];

    sections = json_prefs.data.map( item => item.attributes.section);

    return new Set(sections);
  }

}