import { setIdentifierGenerationMethod } from '@ember-data/store';


function createUUID() {

  let dt = new Date().getTime()

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g, function(c) {
      const r = (dt + Math.random() * 16 ) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c=='x' ? r : (r & 0x3 | 0x8)).toString(16)
  });

  return uuid
}

export function initialize(applicationInstance) {
  /*
  When served over HTTPS (i.e. in secure context),
  method window.crypto.randomUUID() is not
  available. Ember data  <= 4.6 uses window.crypto.randomUUID()
  internally to generate IDs, which results in errors like

    https://github.com/ciur/papermerge/issues/471

  Note that above mentioned issue, occur when production environment
  is served over plain HTTP.

  This initializers configures ember data to use custom createUUID().

  https://api.emberjs.com/ember-data/4.6/functions/@ember-data%2Fstore/setIdentifierGenerationMethod
  */
  setIdentifierGenerationMethod((resource, bucket) => {
    return resource.lid || createUUID();
  });
}

export default {
  name: 'configure-ember-data-identifiers',
  initialize
};
