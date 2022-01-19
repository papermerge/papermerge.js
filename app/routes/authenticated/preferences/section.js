import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class SectionRoute extends Route {
  @service requests;

  async model(params) {
    /**
     * Returns preferences filtered by section ``params.section_name``
    **/
    const prefs = await this.requests.preferences({
      section_name: params.section_name
    });
    const json_prefs = await prefs.json();
    let sections = [], ret;

    sections = json_prefs.data.map(item => item.attributes);

    ret = {
      section_name: params.section_name,
      sections: sections
    };

    return ret;
  }

}
