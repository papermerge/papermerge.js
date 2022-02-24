import BaseRoute from 'papermerge/routes/base';


export default class AuthenticatedRoute extends BaseRoute {

  async model() {
    let home_folder_id,
      inbox_folder_id,
      pinned_tags,
      tags;

    tags = await this.store.findAll('tag');
    pinned_tags = tags.filter(tag => tag.pinned);

    if (this.currentUser.user) {
      home_folder_id = this.currentUser.user.home_folder.get('id');
      inbox_folder_id = this.currentUser.user.inbox_folder.get('id');
    }

    return {pinned_tags, home_folder_id, inbox_folder_id};
  }
}
