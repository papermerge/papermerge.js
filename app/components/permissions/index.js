import Component from '@glimmer/component';


class PermissionsComponent extends Component {

  get permission_groups() {
    let groups = this.args.permissions.map(item => item.content_type.get('model')),
      result = [];

    groups = new Set(groups);

    groups.forEach(model => {
      let perms = this.args.permissions.filter(item => item.content_type.get('model') === model);
      result.push({model, perms}); // same as result.push({mode: model, perms: perms})
    });


    return result;
  }
}

export default PermissionsComponent;
