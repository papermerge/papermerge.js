import { underscore } from '@ember/string';
import { JSONAPISerializer } from 'ember-cli-mirage';

/*
export default JSONAPISerializer.extend({
});
*/


export default class ApplicationSerializer extends JSONAPISerializer {
  keyForAttribute(attr) {    
    return underscore(attr);
  }

  keyForRelationship(attr) {
    return underscore(attr);
  }
}
