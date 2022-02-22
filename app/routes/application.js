import BaseRoute from 'papermerge/routes/base';


export default class ApplicationRoute extends BaseRoute {

  async model() {
    return this.store.findAll('tag').then((tags) => {
      return tags.filter(tag => tag.pinned);
    });
  }
}
