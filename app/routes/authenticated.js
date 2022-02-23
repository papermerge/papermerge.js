import BaseRoute from 'papermerge/routes/base';


export default class AuthenticatedRoute extends BaseRoute {

  async model() {
    return this.store.findAll('tag').then((tags) => {
      return tags.filter(tag => tag.pinned);
    });
  }
}
