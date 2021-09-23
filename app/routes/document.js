import Route from '@ember/routing/route';

export default class RentalRoute extends Route {
  async model(params) {
    let response = await fetch(`/api/document/${params.document_id}.json`);
    let { data } = await response.json();

    let { attributes } = data;
    let type = 'document';

    return { type, ...attributes };
  }
}
