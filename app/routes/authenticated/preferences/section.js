import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class SectionRoute extends Route {
  @service requests;

  async model(params) {
    /**
     * Returns preferences for section ``params.section_name``
    **/
    const prefs = await this.requests.preferences({section_name: params.section_name});
    const json_prefs = await prefs.json();
    let sections = [];

    sections = json_prefs.data.map(item => item.attributes);

    return sections;
  }

}