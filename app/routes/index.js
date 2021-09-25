import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    let response = await fetch('/api/folder.json');
    let { data } = await response.json();

    return data.map((model) => {
      let { id, type, attributes } = model;
      return { id, type, ...attributes };
    });
  }
}
