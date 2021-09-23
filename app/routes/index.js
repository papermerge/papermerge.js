import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    let response = await fetch('/api/nodes.json');
    let { data } = await response.json();

    return data.map((model) => {
      let { attributes } = model;
      let type = 'document';
      console.log(attributes);
      return { type, ...attributes };
    });
  }
}